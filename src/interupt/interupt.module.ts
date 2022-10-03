import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interupt } from './interupt.entity';
import { InteruptService } from './interupt.service';
import { InteruptController } from './interupt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Interupt])],
  providers: [InteruptService],
  controllers: [InteruptController],
})
export class InteruptModule {}
