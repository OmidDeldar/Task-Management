import { Controller, Get, Post,Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto } from '../dto/create-tasks.Dto';
import { GetTaskFilterDto } from '../dto/get-task-filter-Dto';
import { TaskStatusValidationPipes } from '../pipes/task-status-validation-pipes';
import { taskStatus } from '../enum status/task.status.enum';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../entity/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}



    //get all task or filter a task and find it
    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto){
        return this.taskService.getTasks(filterDto)
    }

    //create a task
    @Post()
    async createTasks(@Body(ValidationPipe) createtaskDto:CreateTaskDto):Promise<Tasks>
    {
        return await this.taskService.createTask(createtaskDto);
    }

    //find a task by id
    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Tasks>{
        return await this.taskService.getTaskById(id);
    }

    //delete a task by id
    @Delete('/:id')
    async deleteTaskById(@Param('id',ParseIntPipe) id:number):Promise<string>{
        return await this.taskService.deleteTaskById(id);
    }

    //update status of a task by id
    @Patch('/:id/status')
    async updateStatusById(@Param('id',ParseIntPipe) id:number,@Body('status',TaskStatusValidationPipes) status:taskStatus):Promise<Tasks>{
        return await this.taskService.updateStatusById(id,status);
    }

    //update title of a task by id
    @Post('/:id/title')
    async updateTaskTitle(@Param('id',ParseIntPipe) id:number,@Body('title') title:string ):Promise<Tasks>{
        return await this.taskService.updateTaskTitle(id,title)
    }
}

