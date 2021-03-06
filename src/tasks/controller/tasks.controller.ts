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
    async getTaskById(@Param('id') id:number , @GetUser() user:User):Promise<Tasks>{
        return await this.taskService.getTaskById(id,user);
    }

    //delete a task by id
    @Delete('deleteTask/:id')
    async deleteTaskById(
        @Param('id') id:number,
        @GetUser() user:User):Promise<string>{
        return await this.taskService.deleteTaskById(id,user);
    }

    //update status of a task by id
    @Patch('updateStatus/:id')
    async updateStatusById(
        @Param('id') id:number,
        @Body('status',TaskStatusValidationPipes) status:taskStatus,
        @GetUser() user:User):Promise<Tasks>{
        return await this.taskService.updateStatusById(id,status,user);
    }

    //update title of a task by id
    @Post('updateTitle/:id')
    async updateTaskTitle(
        @Param('id') id:number,
        @Body() title:UpdateTaskTitleDto,
        @GetUser() user:User):Promise<Tasks>{
        return await this.taskService.updateTaskTitle(id,title,user);
    }

    //update description using id
    @Post('updateDescription/:id')
    async updateTaskDescription(
        @Param('id') id:number,
        @Body() description:UpdateTaskDescriptionDto,
        @GetUser() user:User):Promise<Tasks>{
        return await this.taskService.updateTaskDescription(id,description,user);
    }
}

