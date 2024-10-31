import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, User, Modules])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
