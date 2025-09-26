import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix API chung (ví dụ: /api/v1/...)
  app.setGlobalPrefix('api');

  // Pipes validate toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field không có trong DTO
      forbidNonWhitelisted: true, // báo lỗi khi có field lạ
      transform: true, // tự động ép kiểu (string → number)
    }),
  );

  // Nếu sau này có front-end (React, Angular, Vue) → cần bật CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting the application:', error);
  process.exit(1);
});
