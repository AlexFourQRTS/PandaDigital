import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      credentials: true,
    },
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Serve static files
  app.useStaticAssets('media', {
    prefix: '/media/',
  });

  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Panda Backend running on port ${port}`);
}

bootstrap();