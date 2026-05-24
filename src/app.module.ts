// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // Adjust paths based on your actual folder naming
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    PrismaModule,   // Connects your database client globally
    AuthModule,     // Registers /auth/register and /auth/login
    ContactModule,  // Registers your /contacts endpoints
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}