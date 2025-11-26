<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CapacidadesService } from './capacidades.service';
import { Capacidade } from './entities/capacidade.entity';
import { CreateCapacidadeInput } from './dto/create-capacidade.input';
import { UpdateCapacidadeInput } from './dto/update-capacidade.input';

@Resolver(() => Capacidade)
export class CapacidadesResolver {
  constructor(private readonly capacidadesService: CapacidadesService) {}

  @Mutation(() => Capacidade)
  createCapacidade(@Args('createCapacidadeInput') createCapacidadeInput: CreateCapacidadeInput) {
    return this.capacidadesService.create(createCapacidadeInput);
  }

  @Query(() => [Capacidade], { name: 'capacidades' })
  findAll() {
    return this.capacidadesService.findAll();
  }

  @Query(() => Capacidade, { name: 'capacidade' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.capacidadesService.findOne(id);
  }

  @Mutation(() => Capacidade)
  updateCapacidade(@Args('updateCapacidadeInput') updateCapacidadeInput: UpdateCapacidadeInput) {
    return this.capacidadesService.update(updateCapacidadeInput.id, updateCapacidadeInput);
  }

  @Mutation(() => Capacidade)
  removeCapacidade(@Args('id', { type: () => Int }) id: number) {
    return this.capacidadesService.remove(id);
  }
=======
// src/capacidades/capacidades.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CapacidadType } from '../types/capacidades.type';
import { CapacidadesRestService } from './capacidades.service';

@Resolver(() => CapacidadType)
export class CapacidadesResolver {
  constructor(private capacidadesService: CapacidadesRestService) {}

  @Query(() => [CapacidadType], { name: 'capacidades' })
  async getCapacidades() {
    return this.capacidadesService.findAll();
  }

  @Query(() => CapacidadType, { name: 'capacidad' })
  async getCapacidad(@Args('id', { type: () => Int }) id: string) {
    return this.capacidadesService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
