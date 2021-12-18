import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";
//dto for creating a task(id and status are automatic)
export class CreateTaskDto {
    @IsNotEmpty()
    @ApiProperty()
    title:string;

    @IsNotEmpty({message:'empty'})
    @ApiProperty()
    description:string;
}