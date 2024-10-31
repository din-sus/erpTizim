import { Body, Injectable, Param, Req } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly courseRepo: Repository<Course>, @InjectRepository(User) private readonly userRepo: Repository<User>, @InjectRepository(Modules) private readonly moduleRepo: Repository<Modules>){}

  async create(createCourseDto: CreateCourseDto, @Body() moduleName: string) {
    try {
      let check = await this.courseRepo.findOne({where: {name: createCourseDto.name}})
      let findModule = await this.moduleRepo.findOne({where: {name: moduleName}})

      if(check) {
        return {
          success: false,
          message: 'The course already exists❗'
        }
      }else {
        let createCourse = this.courseRepo.create(createCourseDto)
        createCourse.module = [findModule]
        await this.courseRepo.save(createCourse)

        return {
          success: true,
          message: 'Created successfully✅'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findCourse(@Body() courseName: string) {
    let check = await this.courseRepo.findOne({where: {name: courseName[0]}})

    if(!check ){
      return {
        success: false,
        message: 'No course found💔'
      }
    }else {
      return {
        success: true,
        data: check
      }
    }
  }

  async subscribeToCourse(@Req() request: Request, @Body() courseName: string) {
    let check = await this.courseRepo.findOne({where: {name: courseName[0]}})
    let token: any = request.headers.token
    let {email}: any = verify(token, 'secret')
    let findUser = await this.userRepo.findOne({where: {email: email}})

    if(!check ){
      return {
        success: false,
        message: 'No course found💔'
      }
    }else {
      if(!findUser) {
        return {
          success :false,
          message: 'You cannot subscribe to this course💔'
        }
      }else{
        if(findUser.role == 'user') {
          let subscribedUser = this.userRepo.create(findUser)
          subscribedUser.course = check
          await this.userRepo.save(subscribedUser)

          return {
            success: true,
            message :'You have successfully subscribed✅'
          }
        }else{
          return {
            success: false,
            message : 'Sorry only admin can add you to this course💔'
          }
        }
      }
    }
  }

  async addTeacherToCourse(@Req() request: Request, @Body() courseName: string, email: string) {
    console.log(courseName['courseName'], courseName['email'])

    let checkCourse = await this.courseRepo.findOne({where: {name: courseName['courseName']}})
    let checkTeacher = await this.userRepo.findOne({where: {email: courseName['email']}})

    if(!checkCourse) {
      return{ 
        success: false,
        message: 'Sorry there is no such Course💔'
      }
    }else{
      if(!checkTeacher) {
        return {
          success: false,
          message: 'Sorry there is no such Teacher💔'
        }
      }else{
        if(checkTeacher.role == 'teacher'){
          let teachersCourse = this.userRepo.create(checkTeacher)
          teachersCourse.courseTeacher = [checkCourse]
          await this.userRepo.save(teachersCourse)

          return {
            success: true,
            message: 'Teacher successfully added to the course✅'
          }
        }else {
          return {
            success: false,
            message: "The person is not a teacher❗"
          }
        }
      }
    }

  }

  async findAll() {
    try {
      return await this.courseRepo.find({relations: ['user', 'teacher']})
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findOne(id: number){
    let check = await this.courseRepo.findOne({where: {id}, relations: ['module']})

    if(!check){
      return {
        success: false,
        message: 'There is no such course💔'
      }
    }else{
      return {
        success: true,
        data: check
      }
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    let check = await this.courseRepo.findOne({where: {id}})

    if(!check){
      return {
        success: false,
        message: 'There is no such course❗'
      }
    }else {
      let update = this.courseRepo.merge(check, updateCourseDto)
      await this.courseRepo.save(update)

      return{
        success: true,
        message: 'Updated successfully✅'
      }
    }
  }

  async remove(id: number) {
    try {
      let check = await this.courseRepo.findOne({where: {id}})

      if(!check){
        return {
          success: false,
          message: 'There is no such course❗'
        }
      }else {
        let deleteCourse = this.courseRepo.delete(id)

        return{
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
