<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';

@Resolver(() => Reserva)
export class ReservasResolver {
  constructor(private readonly reservasService: ReservasService) {}

  @Mutation(() => Reserva)
  createReserva(@Args('createReservaInput') createReservaInput: CreateReservaInput) {
    return this.reservasService.create(createReservaInput);
  }

  @Query(() => [Reserva], { name: 'reservas' })
  findAll() {
    return this.reservasService.findAll();
  }

  @Query(() => Reserva, { name: 'reserva' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reservasService.findOne(id);
  }

  @Mutation(() => Reserva)
  updateReserva(@Args('updateReservaInput') updateReservaInput: UpdateReservaInput) {
    return this.reservasService.update(updateReservaInput.id, updateReservaInput);
  }

  @Mutation(() => Reserva)
  removeReserva(@Args('id', { type: () => Int }) id: number) {
    return this.reservasService.remove(id);
  }
=======
// src/reservas/reservas.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ReservaType } from '../types/reserva.type';
import { ReservasRestService } from './reservas.service';

@Resolver(() => ReservaType)
export class ReservasResolver {
  constructor(private reservasService: ReservasRestService) {}

  @Query(() => [ReservaType], { name: 'reservas' })
  async getReservas() {
    return this.reservasService.findAll();
  }

  @Query(() => ReservaType, { name: 'reserva' })
  async getReserva(@Args('id', { type: () => Int }) id: number) {
    return this.reservasService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
