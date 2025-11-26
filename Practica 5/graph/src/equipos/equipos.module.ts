<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposResolver } from './equipos.resolver';

@Module({
  providers: [EquiposResolver, EquiposService],
=======
// src/equipos/equipos.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EquiposRestService } from './equipos.service';
import { EquiposResolver } from './equipos.resolver';
import { CapacidadesModule } from '../capacidades/capacidades.module'; // Para relaciones

@Module({
  imports: [HttpModule, CapacidadesModule],
  providers: [EquiposResolver, EquiposRestService],
  exports: [EquiposRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class EquiposModule {}
