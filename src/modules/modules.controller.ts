import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('create')
  @UsePipes(new ValidationPipe)
  create(@Body() createModuleDto: CreateModuleDto, courseName: string) {
    return this.modulesService.create(createModuleDto, courseName);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe)
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(+id, updateModuleDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(+id);
  }
}
