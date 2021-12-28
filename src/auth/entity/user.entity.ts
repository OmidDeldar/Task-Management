import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Tasks } from "src/tasks/entity/task.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password:string;

    @Column()
    salt:string;

    @Column({default:false})
    deleted:boolean

    @OneToMany(type => Tasks , task => task.user , { eager:true })
    @JoinColumn()
    tasks: Tasks[];

    //validate password for sign in
    async validatePassword(password:string) : Promise<boolean>{
        const hash=await bcrypt.hash(password , this.salt);
        return hash === this.password
    }
}