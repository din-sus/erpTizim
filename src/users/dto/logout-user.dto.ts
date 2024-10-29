import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LogoutUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}