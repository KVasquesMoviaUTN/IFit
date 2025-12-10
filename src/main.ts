import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const isProduction = process.env.NODE_ENV === 'production';

  const allowedOrigins = isProduction
    ? (process.env.CORS_ORIGINS || '').split(',')
    : ['http://localhost:8080'];

  app.enableCors({
    origin: (origin, callback) => {
      const isAllowed = isProduction
        ? allowedOrigins.includes(origin)
        : !origin || origin.startsWith('http://localhost');
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(compression());

  // Middleware Logger to debug 401s
  app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(`[Middleware] ${req.method} ${req.url} | Auth: ${authHeader ? 'Present (' + authHeader.substring(0, 15) + '...)' : 'MISSING'}`);
    next();
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('ModoFit API')
    .setDescription('The ModoFit E-commerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
