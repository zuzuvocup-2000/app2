import { Controller, Get, Query } from '@nestjs/common';
import { CrawlService } from 'src/crawl/crawl.service';
import { InteruptService } from 'src/interupt/interupt.service';
import { Website } from 'src/website/website.entity';
import { GetDataCrawlDto } from './dto/get-data-crawl.dto';

@Controller('crawl')
export class CrawlController {
    constructor(
        private interuptService: InteruptService,
        private crawlService: CrawlService
    ) {}


    @Get()
    crawlData(
        @Query() getCrawlDto: GetDataCrawlDto
    ): Promise<Website> {
        let check_interrupt = this.interuptService.checkStatusInterupt('interupt2');

        return ;
    }
}