import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'kalil',
  password: 'fattyshady',
  database: 'IFit',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Use only for development!
};