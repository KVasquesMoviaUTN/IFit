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
  url: 'postgresql:neondb_owner:npg_B4jdtyJ9wHSf@ep-fragrant-cherry-a5og2mdt-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  autoLoadEntities: true,
  synchronize: true,//false en produccion
  ssl: {
    rejectUnauthorized: false,
  },
};