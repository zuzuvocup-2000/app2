import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interupt } from 'src/interupt/interupt.entity';
import { InteruptService } from 'src/interupt/interupt.service';
import { Website } from 'src/website/website.entity';
import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interupt, Website])
  ],
  controllers: [CrawlController],
  providers: [CrawlService, InteruptService]
})
export class CrawlModule {}
