import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interupt } from './interupt.entity';

@Injectable()
export class InteruptService {
    constructor(
        @InjectRepository(Interupt) private interuptRepository: Repository<Interupt>,
    ) {}

    async checkStatusInterupt(name: string): Promise<boolean>{
        const found = await this.interuptRepository.findOne({
            where: {name},
        });
        if (!found || found.status != 1) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        return true;
    }
}
