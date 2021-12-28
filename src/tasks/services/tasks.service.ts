import { Injectable, NotFoundException } from '@nestjs/common';
import {taskStatus } from '../enum status/task.status.enum';
import {v1 as uuid} from 'uuid';
import { CreateTaskDto } from '../dto/create-tasks.Dto';
import { GetTaskFilterDto } from '../dto/get-task-filter-Dto';
import { stat } from 'fs';
import { count } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../repository/task.repository';
import { Tasks } from '../entity/task.entity';
import { take } from 'rxjs';
import { UpdateTaskTitleDto } from '../dto/update-task-title.Dto';
import { UpdateTaskDescriptionDto } from '../dto/update-task-description.dto';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) 
        private taskRepository:TaskRepository)
    {}

    //get all task or filter it
    async getTasks(getTaskDto:GetTaskFilterDto,user:User):Promise<Tasks[]>{
         return await this.taskRepository.getTasks(getTaskDto,user)
    }
    

     //create task 
     async createTask(
         createTaskDto:CreateTaskDto,
         user:User
         ):Promise<Tasks>{
         return await this.taskRepository.createTask(createTaskDto,user)
     }
   

    // //find task by id
    async getTaskById(id:number):Promise<Tasks>{
        const found=await this.taskRepository.findOne(id);
         if(!found){
             throw new NotFoundException(`task with id ${id} doesnt exist`);
         }

         return found
    }
    // //delete task by id
    async deleteTaskById(id:number):Promise<string>{
        //const found=this.taskRepository.findOne(id);
        const founded=await this.getTaskById(id)
        if (!founded) 
        throw new NotFoundException()
         founded.deleted=true;
        this.taskRepository.save(founded)
        return 'delete successfully'
    }

    //update status by id
    async updateStatusById(id:number,status:taskStatus):Promise<Tasks>{
        const task=await this.getTaskById(id);
        task.status=status;
        await this.taskRepository.save(task);
        return task;
    }


  

    // //update task title
    async updateTaskTitle(id:number,newTitle:UpdateTaskTitleDto):Promise<Tasks>{
        const {title}=newTitle
        const findId=await this.getTaskById(id);
        findId.title=title;
        await this.taskRepository.save(findId);
        return findId
    }

    // update task description
    async updateTaskDescription(id:number,newDescription:UpdateTaskDescriptionDto):Promise<Tasks>{
        const {description}=newDescription
        const findId=await this.getTaskById(id);
        findId.description=description;
        await this.taskRepository.save(findId);
        return findId;
    }
}
