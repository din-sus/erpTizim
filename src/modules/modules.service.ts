import { Body, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Injectable()
export class ModulesService {
  constructor(@InjectRepository(Modules) private readonly moduleRepo: Repository<Modules>, @InjectRepository(Course) private readonly courseRepo: Repository<Course>, @InjectRepository(Assignment) private readonly assignmentRepo: Repository<Assignment>){}

  async create(createModuleDto: CreateModuleDto, @Body() courseName: string) {
    try {
      let check = await this.moduleRepo.findOne({where: {name: createModuleDto.name}})
      let findCourse = await this.courseRepo.findOne({where: {name: courseName}})

      if(check) {
        return {
          success: false,
          message: 'The module already exists❗'
        }
      }else{
        if(!findCourse) {
          return {
            success: false,
            message: 'There is no such course💔'
          }
        }else{
          let createModule = this.moduleRepo.create(createModuleDto)
            createModule.course = findCourse
            await this.moduleRepo.save(createModule)

            return {
              success: true,
              message: 'Created successfully✅'
            }
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    try {
      return await this.moduleRepo.find({relations: ['course']})
    } catch (error) {
      return {
        message: error.message
      }
    }
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {
    try {
      let check = await this.moduleRepo.findOne({where: {id}})

      if(!check) {
        return {
          success: false,
          message: "There is no such module💔"
        }
      }else{
        let update = this.moduleRepo.merge(check, updateModuleDto)
          await this.moduleRepo.save(update)

          return {
            success: true,
            message: 'Updated successfully✅'
          }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      console.log(id)
      let check = await this.moduleRepo.findOne({where: {id}})
      console.log(check)

      if(!check) {
        return {
          success: false,
          message: "There is no such module💔"
        }
      }else{
        let deleteModule = await this.moduleRepo.delete(id)

        return {
          success: true,
          message: 'Deleted successfully✅'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
