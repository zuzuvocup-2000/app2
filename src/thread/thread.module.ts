import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Thread])],
    providers: [ThreadService],
    controllers: [ThreadController],
  })
export class ThreadModule {}
