import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreThreadDto } from './dto/store-thread.dto';
import { Thread } from './thread.entity';

@Injectable()
export class ThreadService {
    constructor(
        @InjectRepository(Thread) private threadRepository: Repository<Thread>,
    ) {}
    
    async getNumberThread(id: number): Promise<number>{
        const found = await this.threadRepository.findOne({
            where: {id: id},
        });
        if (!found) {
            throw new NotFoundException(`Thread with ID: "${id}" not found`);
        }
        return found.number
    }

    async getThreadById(id: number): Promise<Thread> {
        const found = await this.threadRepository.findOne({
            where: {id: id},
        });
        if (!found) {
            throw new NotFoundException(`Thread with ID: "${id}" not found`);
        }
        return found;
    }

    async createThread(storeThreadDto: StoreThreadDto): Promise<Thread> {
        const { name, number} = storeThreadDto;
        const thread = this.threadRepository.create({
            name,
            number,
        });

        await this.threadRepository.save(thread);
        return thread;
    }

    async updateThread(id: number, storeThreadDto: StoreThreadDto): Promise<Thread> {
        const thread = await this.getThreadById(id);
        const { name, number} = storeThreadDto;
        const thread_update = this.threadRepository.save({
            name,
            number,
        });

        return thread_update;
    }

    async deleteThread(id: number): Promise<void> {
        const found = await this.getThreadById(id);

        await this.threadRepository.delete({id});
    }
}
