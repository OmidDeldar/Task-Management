import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmConfiguration } from './postgres-typeorm-configuration';

@Module({
    imports:[TypeOrmModule.forRootAsync({useClass:PostgresTypeOrmConfiguration})]
})
export class DatabaseModule {}
