import { Controller, Get,  Query } from '@nestjs/common';
import { CrawlService } from 'src/crawl/crawl.service';
import { Interupt } from 'src/interupt/interupt.entity';
import { InteruptService } from 'src/interupt/interupt.service';
import { ThreadService } from 'src/thread/thread.service';
import { Website } from 'src/website/website.entity';
import { WebsiteService } from 'src/website/website.service';
import { GetDataCrawlDto } from './dto/get-data-crawl.dto';

@Controller('crawl')
export class CrawlController {
    constructor(
        private interuptService: InteruptService,
        private threadService: ThreadService,
        private crawlService: CrawlService,
        private websiteService: WebsiteService,
    ) {}

    @Get()
    async crawlData() {
        const check_interupt = await this.interuptService.checkStatusInterupt('interupt2');
        const number_threads = await this.threadService.getNumberThread(1)
        let website = [];
        let urls = [];
        if(number_threads > 0){
            
            const browser = await this.crawlService.startBrowser();
            website = await this.crawlService.getListByNumber(number_threads)
            for (let index = 0; index < website.length; index++) {
                urls = await this.crawlService.crawlUrlWebsite(browser, website[index].queue1_website, website[index].queue1_id);
            }
        }
        return urls;
    }

    // @Get('/sitemap')
    // async getSitemap() {
    //     const check_interupt = await this.interuptService.checkStatusInterupt('interupt2');
    //     const number_threads = await this.threadService.getNumberThread(1)
    //     let website = "";
    //     let sitemap = [];
    //     if(number_threads > 0){
    //         const browser = await this.crawlService.startBrowser();
    //         for (let index = 1; index <= number_threads; index++) {
    //             website = await this.websiteService.getListByNumber(index)
    //             sitemap.push(await this.crawlService.getSitemap(website));
    //         }
    //     }
    //     return sitemap;
    // }
}