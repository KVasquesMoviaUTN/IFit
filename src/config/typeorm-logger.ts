import { Logger, QueryRunner } from 'typeorm';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export class TypeOrmLogger implements Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new DailyRotateFile({
          dirname: 'logs',
          filename: 'database-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    });
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.info('query', { query, parameters });
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.error('query failed', { error, query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.warn('query is slow', { time, query, parameters });
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.info('schema build', { message });
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.info('migration', { message });
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    this.logger.log(level, message);
  }
}
