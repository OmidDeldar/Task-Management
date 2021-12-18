import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateTaskDescriptionDto{
    @ApiProperty()
    @IsNotEmpty()
    description:string
}