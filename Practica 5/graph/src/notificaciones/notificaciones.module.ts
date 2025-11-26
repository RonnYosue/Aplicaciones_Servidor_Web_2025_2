<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesResolver } from './notificaciones.resolver';

@Module({
  providers: [NotificacionesResolver, NotificacionesService],
=======
// src/notificaciones/notificaciones.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NotificacionesRestService } from './notificaciones.service';
import { NotificacionesResolver } from './notificaciones.resolver';
import { UsersModule } from '../users/users.module'; // Para relaciones

@Module({
  imports: [HttpModule, UsersModule],
  providers: [NotificacionesResolver, NotificacionesRestService],
  exports: [NotificacionesRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class NotificacionesModule {}
