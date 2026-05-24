// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply request parsing validators globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Build Swagger UI configurations explicitly
  const config = new DocumentBuilder()
    .setTitle('Mini Contact Directory Management API Engine')
    .setDescription('Automated Smart-Merge Contact syncing platform powered by NestJS and Prisma ORM.')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'Enter your JWT JWT security access token'
      },
      'JWT-auth', // This string name must match @ApiBearerAuth('JWT-auth') in controllers
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Server launched successfully. Access documentation UI at http://localhost:3000/api`);
}
bootstrap();