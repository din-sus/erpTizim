import { Body, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}


  async register(createUserDto: CreateUserDto) {
    let check = await this.userRepo.findOne({where: {email: createUserDto.email}})

    if(check) {
      return{
        successs: false,
        message: 'You have registered before please login❗'
      }
    }else{
      let registerUser = this.userRepo.create(check)
      await this.userRepo.save(registerUser)

      return {
        success: true,
        message: 'You have registered successfully✅'
      }
    }
  }

  async login(createUserDto: CreateUserDto) {
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
        message: 'You have registered logined',
        token: access_token
      }
    }
  }

  async logout(@Req() request: Request, @Body() email: string) {
    let check = await this.userRepo.findOne({where: {email}})
    let token = request.headers.token

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


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    let check = await this.userRepo.findOne({where: {email: updateUserDto.email}})

    if(!check) {
      return {
        success: false,
        message: 'There is no such user❗'
      }
    }else{
      let update = this.userRepo.merge(updateUserDto, check)
      await this.userRepo.save(update)

      return {
        success: true,
        message: 'Updated successfully✅'
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
