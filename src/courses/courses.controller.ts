import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('create')
  @UsePipes(new ValidationPipe)
  create(@Body() createCourseDto: CreateCourseDto, moduleName: string) {
    return this.coursesService.create(createCourseDto, moduleName);
  }

  @Post('find')
  find(@Body() courseName: string) {
    return this.coursesService.findCourse(courseName);
  }

  @Get(':id/modules')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Post('subscribe')
  subscribeToCourse(@Req() request: Request, @Body() courseName: string) {
    return this.coursesService.subscribeToCourse(request, courseName);
  }

  @Post('add/teacher')
  addTeacherToCourse(@Req() request: Request, @Body() courseName: string, email: string) {
    return this.coursesService.addTeacherToCourse(request, courseName, email);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
