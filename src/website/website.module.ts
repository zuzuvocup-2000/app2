import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './website.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
})
export class WebsiteModule {}
