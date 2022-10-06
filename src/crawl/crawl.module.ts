import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interupt } from 'src/interupt/interupt.entity';
import { InteruptService } from 'src/interupt/interupt.service';
import { Thread } from 'src/thread/thread.entity';
import { ThreadService } from 'src/thread/thread.service';
import { Website } from 'src/website/website.entity';
import { WebsiteService } from 'src/website/website.service';
import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';
import { BullModule } from '@nestjs/bull';
import { MessageConsumer } from './message.consumer';
import { Queue2 } from './queue/queue2.entity';
import { Queue1 } from './queue/queue1.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name:'message-queue'
    }),
    TypeOrmModule.forFeature([
      Interupt, 
      Website, 
      Thread, 
      Website,
      Queue2,
      Queue1,
      
    ]),
  ],
  controllers: [CrawlController],
  providers: [CrawlService, ThreadService, InteruptService, WebsiteService, MessageConsumer]
})
export class CrawlModule {}
