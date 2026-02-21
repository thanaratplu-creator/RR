import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { HrModule } from './modules/hr.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, HrModule],
  controllers: [AppController]
})
export class AppModule {}
