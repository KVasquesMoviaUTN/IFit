import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'kalil',
  // password: 'fattyshady',
  // database: 'IFit',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // url: process.env.DATABASE_URL,
  url: 'postgresql://modofitsql_user:E99nHiIQO9CFgg7cpAhcP0imAW6LuLBy@dpg-culqbran91rc73eh3cog-a.oregon-postgres.render.com/modofitsql',
  autoLoadEntities: true,
  synchronize: false,//false en produccion
  ssl: {
    rejectUnauthorized: false,
  },
};