import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteModule } from './website/website.module';
import { InteruptModule } from './interupt/interupt.module';
import { CrawlModule } from './crawl/crawl.module';
import { ThreadModule } from './thread/thread.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'crawl-in-threads',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    WebsiteModule, InteruptModule, CrawlModule, ThreadModule,
  ],
})
export class AppModule {}
