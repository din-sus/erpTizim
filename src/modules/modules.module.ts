import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Course, Assignment])],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
