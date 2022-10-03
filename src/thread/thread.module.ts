import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Thread])],
  })
export class ThreadModule {}
