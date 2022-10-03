import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {  TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskServices: TasksService){
        
    }

    @Get()
    getAllTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]>{
        return this.taskServices.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id :string ,
        @GetUser() user: User,
    ): Promise<Task>{
        return this.taskServices.getTaskById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task>{
        return this.taskServices.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateTaskById(
        @Param('id') id: string, 
        @Body() updateTaskStatusDto : UpdateTaskStatusDto,
        @GetUser() user: User,
    ) : Promise<Task>{
        console.log(1);
        const { status } = updateTaskStatusDto;
        return this.taskServices.updateTask(id, status, user);
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id') id :string ,
        @GetUser() user: User,
    ): Promise<void>{
        return this.taskServices.deleteTask(id, user);
    }
}
