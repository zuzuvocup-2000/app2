import { Injectable, NotFoundException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import GetSitemapLinks from "get-sitemap-links";
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , DataSource} from 'typeorm';
import { Queue1 } from './queue/queue1.entity';
import { Queue2 } from './queue/queue2.entity';
@Injectable()
export class CrawlService {
    constructor(
        @InjectRepository(Queue1) private queue1Repository: Repository<Queue1>,
        @InjectRepository(Queue2) private queue2Repository: Repository<Queue2>,
        private dataSource: DataSource,
    ) {}
    async startBrowser(){
        let browser;
        try {
            browser = puppeteer.launch({
                // Có hiện UI của Chrome hay không, false là có
                headless: true,
                // Chrome sử dụng multiple layers của sandbox để tránh những nội dung web không đáng tin cậy
                args: ['--disabled-setuid-sandbox'],
                'ignoreHTTPSErrors': true
            })
        } catch (error) {
            console.log('Không tạo được browser:' + error);
        }

        return browser;
    }

    async getListByNumber(count: number){
        const found = await this.queue1Repository.createQueryBuilder('queue1').orderBy('id', 'ASC').limit(count).execute();
        if (!found) {
            throw new NotFoundException(`Can not find Website`);
        }
        return found
    }

    async crawlUrlWebsite(browser, url = "", id){
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle2',
        });
        const results = await page.evaluate(async () => {
            const urls = [];
            const refuse = [`/`, `./`, `*`, `#`, `javascript:void(0)`, ``, document.URL];
            var links = document.getElementsByTagName("a")
            for (var i=0; i<links.length; i++) {
                let url_check = links[i].getAttribute("href");
                if(!refuse.includes(url_check)){
                    url_check = document.URL + url_check.replace(document.URL, '');
                    urls.push(url_check);
                }
            }
            return urls;
        })
        
        let data = await this.checkStatusUrl(results)
        if((data).length > 0) {
            // await this.addDataToQueue2(data, url);
            // await this.deleteQueue1(id)
            this.getUrlFromQueue2(data, url)
        }
        return data;
    }

    async getUrlFromQueue2(data, url){

    }

    async checkStatusUrl(results){
        const checkLinks = require('check-links')
        let website = [...new Set(results)];
        const data = await checkLinks(results);
        const alive = [];
        const keys = Object.keys(data);
        for (let index of keys) {
            if(data[index].statusCode <= 300) alive.push(index)
        }
        return alive;
    }

    async getSitemap(url = '') {
        const array = await GetSitemapLinks(url+'/sitemap.xml');
        return array;
    }

    async addDataToQueue2(data, currentUrl){
        
        const features: Queue2[] = []
        for(let i = 0; i< data.length; i++){
            features.push(this.queue2Repository.create({url: data[i], website : currentUrl}))
        }
        return await this.dataSource.manager.save(features)
    }

    async getDataViaPuppeteer(location = '') {
        const URL = `https://www.iproperty.com.my/sale/all-residential/?q=${location}`;
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto(URL, {
            waitUntil: 'networkidle2',
        });

        const results = await page.evaluate(() => {
            const propertyList = [];

            document
                .querySelectorAll('.ListingsListstyle__ListingListItemWrapper-bmHwPm')
                .forEach((z) => {
                    const tempImgList = [];

                    z.querySelectorAll(
                        '.ListingImageCarouselstyle__CarouselWrapper-dtbMQB.jibwWZ.Premium picture',
                    ).forEach((x) => {
                        if (x.querySelector('img').src)
                            tempImgList.push(x.querySelector('img').src);
                    });

                    const data = {
                        title: z.querySelector('.detail-property > div > h2')?.textContent,
                        price: z.querySelector('.listing-price > ul > li')?.textContent,
                        pricePSF: z.querySelector('.listing-price > div')?.textContent,
                        address: z.querySelector(
                            '.detail-property > div > div.PremiumCardstyle__AddressWrapper-ldsjqp.gRJjrp',
                        )?.textContent,
                        descriptionItem: z.querySelector(
                            '.detail-property .attributes-description > p',
                        )?.textContent,
                        bedroomCount: z.querySelector('.bedroom-facility')?.textContent,
                        bathroomCount: z.querySelector('.bathroom-facility')?.textContent,
                        carparkCount: z.querySelector('.carPark-facility')?.textContent,
                        agentContact: z.querySelector('a.phone-mobile')?.getAttribute('href'),
                        propertyUrl: z.querySelector('.depth-listing-card-link')?.getAttribute('href'),
                        postedBy: z.querySelector('#listing-heading-title')?.textContent,
                        postedDate: z.querySelector(
                            '.ListingHeadingstyle__HeadingCreationDate-hVckGQ',
                        )?.textContent,
                        imgList: tempImgList,
                    };

                    propertyList.push(data);
                });

            return propertyList;
        });

        console.log('getDataViaPuppeteer results :', results);
        await browser.close();
        return results;
    }

    async deleteQueue1(id){
        await this.queue1Repository.delete({id});
    }
}
