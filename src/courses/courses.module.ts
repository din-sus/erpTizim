import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, Modules])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
