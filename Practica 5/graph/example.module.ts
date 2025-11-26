<<<<<<< HEAD
import { Module, HttpModule } from '@nestjs/common';
=======
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
import { ExampleService } from './example.services';
import { ExampleResolver } from './example.resolver';

@Module({
  imports: [HttpModule],
  providers: [ExampleService, ExampleResolver],
})
export class ExampleModule {}
