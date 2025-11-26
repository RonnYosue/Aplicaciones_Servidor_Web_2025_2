<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EquiposService } from './equipos.service';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoInput } from './dto/create-equipo.input';
import { UpdateEquipoInput } from './dto/update-equipo.input';

@Resolver(() => Equipo)
export class EquiposResolver {
  constructor(private readonly equiposService: EquiposService) {}

  @Mutation(() => Equipo)
  createEquipo(@Args('createEquipoInput') createEquipoInput: CreateEquipoInput) {
    return this.equiposService.create(createEquipoInput);
  }

  @Query(() => [Equipo], { name: 'equipos' })
  findAll() {
=======
// src/equipos/equipos.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Equipo } from '../types/equipos.type';
import { EquiposRestService } from './equipos.service';

@Resolver(() => Equipo)
export class EquiposResolver {
  constructor(private equiposService: EquiposRestService) {}

  @Query(() => [Equipo], { name: 'equipos' })
  async getEquipos() {
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
    return this.equiposService.findAll();
  }

  @Query(() => Equipo, { name: 'equipo' })
<<<<<<< HEAD
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.equiposService.findOne(id);
  }

  @Mutation(() => Equipo)
  updateEquipo(@Args('updateEquipoInput') updateEquipoInput: UpdateEquipoInput) {
    return this.equiposService.update(updateEquipoInput.id, updateEquipoInput);
  }

  @Mutation(() => Equipo)
  removeEquipo(@Args('id', { type: () => Int }) id: number) {
    return this.equiposService.remove(id);
  }
=======
  async getEquipo(@Args('id', { type: () => Int }) id: string) {
    return this.equiposService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
