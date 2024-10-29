import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}