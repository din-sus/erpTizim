import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/logn-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';
import { Validator } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe)
  register(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto)
  }

  @Post('login')
  @UsePipes(new ValidationPipe)
  login(@Body() createUserDto: LoginUserDto) {
    return this.usersService.login(createUserDto)
  }

  @Post('logout')
  @UsePipes(new ValidationPipe)
  logout(@Req() request: Request, @Body() logoutUserDto: LogoutUserDto) {
    return this.usersService.logout(request, logoutUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
