import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './website.entity';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Website])
  ],
  providers: [WebsiteService],
  controllers: [WebsiteController],
})
export class WebsiteModule {}
