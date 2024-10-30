import { Body, Injectable, Req } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { LoginUserDto } from './dto/logn-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}


  async register(createUserDto: RegisterUserDto) {
    let check = await this.userRepo.findOne({where: {email: createUserDto.email}})
    console.log(check)

    if(check) {
      return{
        successs: false,
        message: 'You have registered before please login❗'
      }
    }else{
      let registerUser = this.userRepo.create(createUserDto)
      await this.userRepo.save(registerUser)

      return {
        success: true,
        message: 'You have registered successfully✅'
      }
    }
  }

  async login(createUserDto: LoginUserDto) {
    let check = await this.userRepo.findOne({where: {email: createUserDto.email}})

    if(!check) {
      return{
        successs: false,
        message: 'Please register❗'
      }
    }else{
      let refresh_token = sign({email: check.email}, 'secret', {expiresIn: '1d'})
      let access_token = sign({email: check.email}, 'secret')

      return {
        success: true,
        message: 'You have logined successfully✅',
        token: access_token
      }
    }
  }

  async logout(@Req() request: Request, logoutUserDto: LogoutUserDto) {
    let check = await this.userRepo.findOne({where: {email: logoutUserDto.email}})
    let token:any = request.headers.token

    if(!check){
      return {
        success: false,
        message: 'Wrong email❗'
      }
    }else{
      let logout = await this.userRepo.delete(check)
      token = ''

      return {
        success: true,
        message: 'You have successfully logouted✅'
      }
    }
  }


  create(createUserDto: RegisterUserDto) {
    return 'This action adds a new user';
  }


  async findAll() {
    return await this.userRepo.find({relations: ['course', 'courseTeacher']})
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
