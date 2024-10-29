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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    password: '1111',
    port: 5433,
    database: 'exam',
    username: 'postgres',
    autoLoadEntities: true,
    entities: [User],
    synchronize: true
  }) ,UsersModule, CoursesModule, ModulesModule, AssignmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyRole)
      .forRoutes(
        { path: '/', method: RequestMethod.ALL }
      );
  }
}
