<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HorariosService } from './horarios.service';
import { Horario } from './entities/horario.entity';
import { CreateHorarioInput } from './dto/create-horario.input';
import { UpdateHorarioInput } from './dto/update-horario.input';

@Resolver(() => Horario)
export class HorariosResolver {
  constructor(private readonly horariosService: HorariosService) {}

  @Mutation(() => Horario)
  createHorario(@Args('createHorarioInput') createHorarioInput: CreateHorarioInput) {
    return this.horariosService.create(createHorarioInput);
  }

  @Query(() => [Horario], { name: 'horarios' })
  findAll() {
    return this.horariosService.findAll();
  }

  @Query(() => Horario, { name: 'horario' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.horariosService.findOne(id);
  }

  @Mutation(() => Horario)
  updateHorario(@Args('updateHorarioInput') updateHorarioInput: UpdateHorarioInput) {
    return this.horariosService.update(updateHorarioInput.id, updateHorarioInput);
  }

  @Mutation(() => Horario)
  removeHorario(@Args('id', { type: () => Int }) id: number) {
    return this.horariosService.remove(id);
  }
=======
// src/horarios/horarios.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { HorarioType } from '../types/horarios.type';
import { HorariosRestService } from './horarios.service';

@Resolver(() => HorarioType)
export class HorariosResolver {
  constructor(private horariosService: HorariosRestService) {}

  @Query(() => [HorarioType], { name: 'horarios' })
  async getHorarios() {
    return this.horariosService.findAll();
  }

  @Query(() => HorarioType, { name: 'horario' })
  async getHorario(@Args('id', { type: () => Int }) id: number) {
    return this.horariosService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
