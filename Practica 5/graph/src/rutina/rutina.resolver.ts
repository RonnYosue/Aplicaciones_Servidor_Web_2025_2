<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RutinaService } from './rutina.service';
import { Rutina } from './entities/rutina.entity';
import { CreateRutinaInput } from './dto/create-rutina.input';
import { UpdateRutinaInput } from './dto/update-rutina.input';

@Resolver(() => Rutina)
export class RutinaResolver {
  constructor(private readonly rutinaService: RutinaService) {}

  @Mutation(() => Rutina)
  createRutina(@Args('createRutinaInput') createRutinaInput: CreateRutinaInput) {
    return this.rutinaService.create(createRutinaInput);
  }

  @Query(() => [Rutina], { name: 'rutina' })
  findAll() {
    return this.rutinaService.findAll();
  }

  @Query(() => Rutina, { name: 'rutina' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rutinaService.findOne(id);
  }

  @Mutation(() => Rutina)
  updateRutina(@Args('updateRutinaInput') updateRutinaInput: UpdateRutinaInput) {
    return this.rutinaService.update(updateRutinaInput.id, updateRutinaInput);
  }

  @Mutation(() => Rutina)
  removeRutina(@Args('id', { type: () => Int }) id: number) {
    return this.rutinaService.remove(id);
  }
=======
// src/rutina/rutina.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { RutinaType } from '../types/rutina.types';
import { RutinaRestService } from './rutina.service';

@Resolver(() => RutinaType)
export class RutinaResolver {
  constructor(private rutinaService: RutinaRestService) {}

  @Query(() => [RutinaType], { name: 'rutinas' })
  async getRutinas() {
    return this.rutinaService.findAll();
  }

  @Query(() => RutinaType, { name: 'rutina' })
  async getRutina(@Args('id', { type: () => Int }) id: number) {
    return this.rutinaService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
