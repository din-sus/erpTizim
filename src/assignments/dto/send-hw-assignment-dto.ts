import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SendHwDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
