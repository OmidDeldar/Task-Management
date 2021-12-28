import { type } from "os";
import { User } from "src/auth/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { taskStatus } from "../enum status/task.status.enum";

@Entity()
export class Tasks extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:taskStatus;

    @Column({default:false})
    deleted:boolean;

    @ManyToOne(type => User , user => user.tasks , {eager : false})
    user:User;

    @Column()
    userId:string;
}