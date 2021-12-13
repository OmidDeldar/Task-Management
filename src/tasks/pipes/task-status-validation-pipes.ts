import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { taskStatus } from "../enum status/task.status.enum";


export class TaskStatusValidationPipes implements PipeTransform {
    //get the allowed status from taskStatus class
    readonly allowedStatus =[
        taskStatus.Open,
        taskStatus.In_Progress,
        taskStatus.Done,
    ]

    //if the status dont exist in taskStatus throw an error
    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value
    }


//check the value status 
private isStatusValid(status: any) {
    const idx=this.allowedStatus.indexOf(status);
    return idx !== -1;
}
}