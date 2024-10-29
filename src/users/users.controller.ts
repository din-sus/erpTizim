import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/logn-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('register')
  register(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto)
  }

  @Post('login')
  login(@Body() createUserDto: LoginUserDto) {
    return this.usersService.login(createUserDto)
  }

  @Post('logout')
  logout(@Req() request: Request, email: string) {
    return this.usersService.logout(request, email)
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
