import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function start() {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || '9095';

  const broker = `${host}:${port}`;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [broker],
        },
        consumer: {
          groupId: 'telegram-consumer',
        },
      },
    },
  );
  await app.listen();
}

start();
