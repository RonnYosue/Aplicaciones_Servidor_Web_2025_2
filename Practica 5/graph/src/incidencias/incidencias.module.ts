<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { IncidenciasService } from './incidencias.service';
import { IncidenciasResolver } from './incidencias.resolver';

@Module({
  providers: [IncidenciasResolver, IncidenciasService],
=======
// src/incidencias/incidencias.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IncidenciasRestService } from './incidencias.service';
import { IncidenciasResolver } from './incidencias.resolver';

@Module({
  imports: [HttpModule],
  providers: [IncidenciasResolver, IncidenciasRestService],
  exports: [IncidenciasRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class IncidenciasModule {}
