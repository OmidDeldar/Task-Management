import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

export class PostgresTypeOrmConfiguration implements TypeOrmOptionsFactory
{
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const typeOrmOptions:TypeOrmModuleOptions=
        {
            type:'postgres',
            username:'postgres',
            password:'3231530',
            host:'localhost',
            port:5432,
            autoLoadEntities:true,
            database:'taskmanagment',
            synchronize:true
        }
        return  typeOrmOptions
    }
    
}