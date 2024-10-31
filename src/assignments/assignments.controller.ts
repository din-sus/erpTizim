import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { SendHwDto } from './dto/send-hw-assignment-dto';
import { Request } from 'express';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('create')
  @UsePipes(new ValidationPipe)
  createAssignment(@Body() createAssignmentDto: CreateAssignmentDto, @Body() moduleName: string) {
    return this.assignmentsService.create(createAssignmentDto, moduleName);
  }

  @Post('homework/send')
  @UsePipes(new ValidationPipe)
  userHomeWork(@Req() request: Request, @Body() sendHw: SendHwDto, moduleName: string) {
    return this.assignmentsService.userHw(sendHw, moduleName, request);
  }

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.assignmentsService.findOne(+id);
  // }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe)
  update(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.updateQuestions(+id, updateAssignmentDto);
  }

  @Patch('mark/:id')
  @UsePipes(new ValidationPipe)
  mark(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.giveTheMark(+id, updateAssignmentDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
