import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.SERVICE_PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tri xolma V1 API')
    .setDescription('Документация по использованию API Tri Xolma')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(cors());
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  // TODO исправить проблему с использованием @Param
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Service app listening at ${PORT}`));
}

start();
