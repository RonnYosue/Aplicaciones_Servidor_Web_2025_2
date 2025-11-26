<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaResolver } from './rutina.resolver';

@Module({
  providers: [RutinaResolver, RutinaService],
=======
// src/rutina/rutina.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RutinaRestService } from './rutina.service';
import { RutinaResolver } from './rutina.resolver';
import { UsersModule } from '../users/users.module'; // Para relaciones

@Module({
  imports: [HttpModule, UsersModule],
  providers: [RutinaResolver, RutinaRestService],
  exports: [RutinaRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class RutinaModule {}
