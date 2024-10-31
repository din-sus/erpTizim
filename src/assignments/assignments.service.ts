import { Body, Injectable, Req } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Modules } from 'src/modules/entities/module.entity';
import e, { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SendHwDto } from './dto/send-hw-assignment-dto';

@Injectable()
export class AssignmentsService {
  constructor(@InjectRepository(Assignment) private readonly assignmentRepo: Repository<Assignment>, @InjectRepository(User) private readonly userRepo: Repository<User>, @InjectRepository(Modules) private readonly moduleRepo: Repository<Modules>){}

  async create(createAssignmentDto: CreateAssignmentDto, @Body() moduleName: string) {
    try {
      let check = await this.assignmentRepo.findOne({where: {name: createAssignmentDto.name}})
      let findModule = await this.moduleRepo.findOne({where: {name: moduleName['moduleName']}})

      if(check){
        return {
          success: false,
          message: "Assignment was given before❗"
        }
      }else{
        if(!findModule) {
          return {
            success: false,
            message: "There is no module like this💔"
          }
        }else{
          let create = this.assignmentRepo.create(createAssignmentDto)
          create.module = findModule
          await this.assignmentRepo.save(create)

          return {
            success: true,
            message: 'Created successfully✅'
          }
        }
      }

    } catch (error) {
      return {
        successs: false,
        message: error.message
      }
    }
  }
  

  async userHw(sendHw: SendHwDto, @Body() moduleName: string, @Req() request: Request) {
    try {
      let check = await this.assignmentRepo.findOne({where: {name: sendHw.name}})
      let findModule = await this.moduleRepo.findOne({where: {name: moduleName['moduleName']}})
      let token: any = request.headers.token
      let {email}: any = verify(token, 'secret')
      let findUser = await this.userRepo.findOne({where: {email: email}})

      if(check){
        return {
          success: false,
          message: "Don't copy your home work that was done before❗"
        }
      }else{
        if(!findModule) {
          return {
            success: false,
            message: "There is no module like this💔"
          }
        }else{
          if(!findUser) {
            return {
              success: false,
              message: "Please login❗"
            }
          }else{
            if(findUser.role != 'user'){
              return {
                success: false,
                message: "You are not a student💔"
              }
            }else {
              let sendingHw = this.assignmentRepo.create(sendHw)
              sendingHw.module = findModule
              sendingHw.user = findUser
              await this.assignmentRepo.save(sendingHw)

              return {
                success: true,
                message: "Please wait yet your hw will be checked👻"
              }
            }
          }
        }
      }

    } catch (error) {
      return {
        successs: false,
        message: error.message
      }
    }
  }

  async findAll() {
    try {
      return await this.assignmentRepo.find({relations: ['user', 'module']})
    } catch (error) {
      return {
        message: error.message
      }
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} assignment`;
  // }

  async updateQuestions(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    try {
      let check = await this.assignmentRepo.findOne({where: {id}})

      if(!check) {
        return {
          success: false,
          message :"There is no such Assignment💔"
        }
      }else {
        let update = this.assignmentRepo.merge(check, updateAssignmentDto)
        await this.assignmentRepo.save(update)

        return {
          success: true,
          message: 'Updated successfully✅'
        }
      }
    } catch (error) {
      return {
        success: false,
        message :error.message
      }
    }
  }

  async giveTheMark(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    try {
      let check = await this.assignmentRepo.findOne({where: {id}})

      if(!check) {
        return {
          success: false,
          message :"There is no such Assignment💔"
        }
      }else {
        let update = this.assignmentRepo.merge(check, updateAssignmentDto)
        await this.assignmentRepo.save(update)

        return {
          success: true,
          message: 'Changed mark successfully✅'
        }
      }
    } catch (error) {
      return {
        success: false,
        message :error.message
      }
    }
  }

  async remove(id: number) {
    try {
      let check = await this.assignmentRepo.findOne({where: {id}})

      if(!check) {
        return {
          success: false,
          message :"There is no such Assignment💔"
        }
      }else {
        let deleteAssignment = this.assignmentRepo.delete(id)

        return {
          success: true,
          message: 'Deleted successfully✅'
        }
      }
    } catch (error) {
      return {
        success: false,
        message :error.message
      }
    }
  }
}
