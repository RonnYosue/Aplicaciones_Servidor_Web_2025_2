<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { HorariosResolver } from './horarios.resolver';

@Module({
  providers: [HorariosResolver, HorariosService],
=======
// src/horarios/horarios.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HorariosRestService } from './horarios.service';
import { HorariosResolver } from './horarios.resolver';

@Module({
  imports: [HttpModule],
  providers: [HorariosResolver, HorariosRestService],
  exports: [HorariosRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class HorariosModule {}
