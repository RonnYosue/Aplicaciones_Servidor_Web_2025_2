<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { CapacidadesService } from './capacidades.service';
import { CapacidadesResolver } from './capacidades.resolver';

@Module({
  providers: [CapacidadesResolver, CapacidadesService],
})
export class CapacidadesModule {} //hola me llamo ronny 
=======
// src/capacidades/capacidades.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CapacidadesRestService } from './capacidades.service';
import { CapacidadesResolver } from './capacidades.resolver';

@Module({
  imports: [HttpModule],
  providers: [CapacidadesResolver, CapacidadesRestService],
  exports: [CapacidadesRestService],
})
export class CapacidadesModule {}
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
