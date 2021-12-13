import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';

@Module({
  
  imports: [
    TasksModule,
    DatabaseModule],
})
export class AppModule {}
