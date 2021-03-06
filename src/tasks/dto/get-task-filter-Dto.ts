import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";
import { taskStatus } from "../enum status/task.status.enum";

// dto for filter array by status or title or description
export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([taskStatus.Open,taskStatus.In_Progress,taskStatus.Done])
    @ApiProperty()
    status:taskStatus;

    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    search:string;
}