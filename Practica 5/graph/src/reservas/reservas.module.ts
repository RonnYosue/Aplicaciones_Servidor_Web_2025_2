<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasResolver } from './reservas.resolver';

@Module({
  providers: [ReservasResolver, ReservasService],
=======
// src/reservas/reservas.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReservasRestService } from './reservas.service';
import { ReservasResolver } from './reservas.resolver';

@Module({
  imports: [HttpModule],
  providers: [ReservasResolver, ReservasRestService],
  exports: [ReservasRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class ReservasModule {}
