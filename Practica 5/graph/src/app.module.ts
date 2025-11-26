<<<<<<< HEAD

=======
// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';

// Controlador y servicio principal
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos de la aplicación
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
import { AsistenciasModule } from './asistencias/asistencias.module';
import { CapacidadesModule } from './capacidades/capacidades.module';
import { EquiposModule } from './equipos/equipos.module';
import { HorariosModule } from './horarios/horarios.module';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { ReservasModule } from './reservas/reservas.module';
import { RutinaModule } from './rutina/rutina.module';
<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
 imports: [
 GraphQLModule.forRoot({
 driver: ApolloDriver,
 autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
 sortSchema: true,
 playground: true, // Apollo Playground
 }),
 HttpModule.register({
 baseURL: 'http://localhost:4000/api', // URL del servicio REST
 timeout: 5000,
 maxRedirects: 5,
 }),
 UsersModule,RolModule, AsistenciasModule, CapacidadesModule, EquiposModule, HorariosModule, IncidenciasModule, NotificacionesModule, ReservasModule, RutinaModule],
 controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
=======

// Analytics
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    // HttpModule global para todos los servicios REST
    HttpModule.register({
      baseURL: 'http://localhost:4000/api',
      timeout: 5000,
      maxRedirects: 5,
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Apollo Playground
    }),

    // Módulos de la aplicación
    UsersModule,
    RolModule,
    AsistenciasModule,
    CapacidadesModule,
    EquiposModule,
    HorariosModule,
    IncidenciasModule,
    NotificacionesModule,
    ReservasModule,
    RutinaModule,

    // Analytics (consultas complejas)
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
