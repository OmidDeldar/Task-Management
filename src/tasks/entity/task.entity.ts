import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { taskStatus } from "../enum status/task.status.enum";

@Entity()
export class Tasks {
    static taskRepository: any;
    static save() {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    status:taskStatus

    @Column({default:false})
    deleted:boolean
}