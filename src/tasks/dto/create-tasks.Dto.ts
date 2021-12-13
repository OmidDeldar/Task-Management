import { IsNotEmpty, isNotEmpty } from "class-validator";
//dto for creating a task(id and status are automatic)
export class CreateTaskDto {
    @IsNotEmpty()
    title:string;

    @IsNotEmpty({message:'Poresh kon koskesh'})
    description:string;
}