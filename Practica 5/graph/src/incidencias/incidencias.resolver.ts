<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncidenciasService } from './incidencias.service';
import { Incidencia } from './entities/incidencia.entity';
import { CreateIncidenciaInput } from './dto/create-incidencia.input';
import { UpdateIncidenciaInput } from './dto/update-incidencia.input';

@Resolver(() => Incidencia)
export class IncidenciasResolver {
  constructor(private readonly incidenciasService: IncidenciasService) {}

  @Mutation(() => Incidencia)
  createIncidencia(@Args('createIncidenciaInput') createIncidenciaInput: CreateIncidenciaInput) {
    return this.incidenciasService.create(createIncidenciaInput);
  }

  @Query(() => [Incidencia], { name: 'incidencias' })
  findAll() {
    return this.incidenciasService.findAll();
  }

  @Query(() => Incidencia, { name: 'incidencia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.incidenciasService.findOne(id);
  }

  @Mutation(() => Incidencia)
  updateIncidencia(@Args('updateIncidenciaInput') updateIncidenciaInput: UpdateIncidenciaInput) {
    return this.incidenciasService.update(updateIncidenciaInput.id, updateIncidenciaInput);
  }

  @Mutation(() => Incidencia)
  removeIncidencia(@Args('id', { type: () => Int }) id: number) {
    return this.incidenciasService.remove(id);
  }
=======
// src/incidencias/incidencias.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { IncidenciaType } from '../types/incidencias.type';
import { IncidenciasRestService } from './incidencias.service';

@Resolver(() => IncidenciaType)
export class IncidenciasResolver {
  constructor(private incidenciasService: IncidenciasRestService) {}

  @Query(() => [IncidenciaType], { name: 'incidencias' })
  async getIncidencias() {
    return this.incidenciasService.findAll();
  }

  @Query(() => IncidenciaType, { name: 'incidencia' })
  async getIncidencia(@Args('id', { type: () => Int }) id: number) {
    return this.incidenciasService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
