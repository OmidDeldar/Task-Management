import { Controller, Get, Post,Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto } from '../dto/create-tasks.Dto';
import { GetTaskFilterDto } from '../dto/get-task-filter-Dto';
import { TaskStatusValidationPipes } from '../pipes/task-status-validation-pipes';
import { taskStatus } from '../enum status/task.status.enum';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../entity/task.entity';
import { UpdateTaskTitleDto } from '../dto/update-task-title.Dto';
import { UpdateTaskDescriptionDto } from '../dto/update-task-description.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';

@ApiTags('Tasks')
@Controller('tasks')
 @UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService:TasksService){}



    //get all task or filter a task and find it
    @Get('findtasks')
    getTasks(
        @Query(ValidationPipe) filterDto:GetTaskFilterDto,
        @GetUser() user:User
        ){
        return this.taskService.getTasks(filterDto,user)
    }

    //create a task
    @Post('create/task')
    async createTasks(
        @Body(ValidationPipe) createtaskDto:CreateTaskDto,
        @GetUser() user:User
        ):Promise<Tasks>
    {
        return await this.taskService.createTask(createtaskDto,user);
    }

    //find a task by id
    @Get('getTaskById/:id')
    async getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Tasks>{
        return await this.taskService.getTaskById(id);
    }

    //delete a task by id
    @Delete('deleteTask/:id')
    async deleteTaskById(@Param('id',ParseIntPipe) id:number):Promise<string>{
        return await this.taskService.deleteTaskById(id);
    }

    //update status of a task by id
    @Patch('updateStatus/:id/status')
    async updateStatusById(@Param('id',ParseIntPipe) id:number,@Body('status',TaskStatusValidationPipes) status:taskStatus):Promise<Tasks>{
        return await this.taskService.updateStatusById(id,status);
    }

    //update title of a task by id
    @Post('updateTitle/:id/title')
    async updateTaskTitle(@Param('id',ParseIntPipe) id:number,@Body('title') title:UpdateTaskTitleDto ):Promise<Tasks>{
        return await this.taskService.updateTaskTitle(id,title)
    }

    //update description using id
    @Post('updateDescription/:id')
    async updateTaskDescription(@Param('id',ParseIntPipe) id:number,@Body() description:UpdateTaskDescriptionDto ):Promise<Tasks>{
        return await this.taskService.updateTaskDescription(id,description);
    }
}

