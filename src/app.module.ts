import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { VerifyRole } from './middleware/VerifyRole';
import { TeacherMiddleware } from './middleware/TeacherMiddleware';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0490',
    database: 'exam',
    entities: [],
    synchronize: true,
    autoLoadEntities: true
  }),UsersModule, CoursesModule, ModulesModule, AssignmentsModule, TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyRole)
      .forRoutes(
        // users
        { path: '/users/logout', method: RequestMethod.ALL },
        { path: '/users', method: RequestMethod.ALL },

        // courses
        { path: '/courses/create', method: RequestMethod.ALL },
        { path: '/courses/update', method: RequestMethod.ALL },
        { path: '/courses/delete', method: RequestMethod.ALL },
        { path: '/courses/add/teacher', method: RequestMethod.ALL },

        // modules
        {path: '/modules/create', method: RequestMethod.ALL},
        {path: '/modules/update', method: RequestMethod.ALL},
        {path: '/modules/delete', method: RequestMethod.ALL},

        // assignments
        {path: '/assignments/create', method: RequestMethod.ALL},
        {path: '/assignments/update', method: RequestMethod.ALL},
        {path: '/assignments/mark', method: RequestMethod.ALL},
        {path: '/assignments/delete', method: RequestMethod.ALL},
      );

    consumer
      .apply(TeacherMiddleware)
      .forRoutes(
        {path: '/assignments/mark', method: RequestMethod.ALL},
      )
  }
}
