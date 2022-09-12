import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  { cors: process.env.NODE_ENV === 'production' });
  app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 1 }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.SERVER_APP_PORT);
}
bootstrap();
