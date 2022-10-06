import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { StoreThreadDto } from './dto/store-thread.dto';
import { Thread } from './thread.entity';
import { ThreadService } from './thread.service';

@Controller('thread')
export class ThreadController {
    constructor(private thread: ThreadService){
        
    }

    @Post()
    createThread(
        @Body() storeThreadDto: StoreThreadDto,
    ): Promise<Thread>{
        return this.thread.createThread(storeThreadDto);
    }

    @Patch('/:id/status')
    updateThreadById(
        @Param('id') id: number,
        @Body() storeThreadDto: StoreThreadDto
    ) : Promise<Thread>{
        return this.thread.updateThread(id, storeThreadDto);
    }

    @Delete('/:id')
    deleteThreadById(
        @Param('id') id :number ,
    ): Promise<void>{
        return this.thread.deleteThread(id);
    }
}
