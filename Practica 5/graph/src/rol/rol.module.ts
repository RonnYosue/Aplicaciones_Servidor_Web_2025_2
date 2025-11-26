<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolResolver } from './rol.resolver';

@Module({
  providers: [RolResolver, RolService],
=======
// src/rol/rol.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RolRestService } from './rol.service';
import { RolResolver } from './rol.resolver';

@Module({
  imports: [HttpModule],
  providers: [RolResolver, RolRestService],
  exports: [RolRestService],
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
})
export class RolModule {}
