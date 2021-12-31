import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
//dto for update a task
export class UpdateTaskTitleDto {
    @IsNotEmpty()
    @ApiProperty()
    title:string;
}