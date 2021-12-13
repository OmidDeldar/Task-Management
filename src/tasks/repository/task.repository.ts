import { Injectable, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-tasks.Dto";
import { GetTaskFilterDto } from "../dto/get-task-filter-Dto";
import { Tasks } from "../entity/task.entity";
import { taskStatus } from "../enum status/task.status.enum";
import { TasksService } from "../services/tasks.service";

@Injectable()
@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks>{
    private taskService:TasksService

    //get all task or filter it
    async getTasks(getTaskDto:GetTaskFilterDto):Promise<Tasks[]>{
        const {status , search}=getTaskDto;
        const query=this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status = :status',{status});
        }
        if(search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{ search: `%${search}%`});
        }
        const tasks=await query.getMany();
        return tasks;
    }

    //create task 
    async createTask(createTaskDto:CreateTaskDto):Promise<Tasks>{
        const {description,title}=createTaskDto;
        const task=new Tasks();
        task.description=description;
        task.title=title;
        task.status=taskStatus.Open;
        const saved_task=await this.save(task)
        return saved_task
    }
    
    //delete task by id
    async deleteTaskById(id:number):Promise<string>{
        const found=await this.findOne({where:{id:id}})
        if(!found)
         throw new NotFoundException(`user with id ${id} doesnt exist`)
        
        this.delete(id);
        return 'Delete Successfully'
    }

}

