import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //Quando nest for usar a validação deste pipe ele vai ignorar todas propriedades que não tiverem no DTO
      forbidNonWhitelisted: true, //Lança um erro se mandar um dado no json que não esta no DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
