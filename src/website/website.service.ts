import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './website.entity';
import { Queue } from 'bull';

@Injectable()
export class WebsiteService {
    constructor(
        @InjectRepository(Website) private websiteRepository: Repository<Website>,
    ) {}
    
    

    

    // async sendMessage(message:string){
    //     const website = await this.getListByNumber(10);
    //     await this.queue.add('website-list',website);
    // }
}
