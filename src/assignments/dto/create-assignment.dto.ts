import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAssignmentDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    mark :number
}
