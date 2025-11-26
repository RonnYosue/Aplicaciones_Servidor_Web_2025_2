<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports : [HttpModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
=======
// users.module.ts
import { Module } from '@nestjs/common';
import { UsersRestService } from './users.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule, // <-- IMPORTANTE: así Nest puede inyectar HttpService
  ],
  providers: [UsersRestService],
  exports: [UsersRestService],  // <- Muy importante exportarlo
})
export class UsersModule {}
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
