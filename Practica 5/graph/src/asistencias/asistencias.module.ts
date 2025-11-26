<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasResolver } from './asistencias.resolver';

@Module({
  providers: [AsistenciasResolver, AsistenciasService],
=======
// src/asistencias/asistencias.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AsistenciasRestService } from './asistencias.service';
import { AsistenciasResolver } from './asistencias.resolver';

@Module({
  imports: [HttpModule],
  providers: [AsistenciasResolver, AsistenciasRestService],
  exports: [AsistenciasRestService, HttpModule],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class AsistenciasModule {}
