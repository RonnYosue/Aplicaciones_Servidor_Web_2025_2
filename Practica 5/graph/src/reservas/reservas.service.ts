<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';

@Injectable()
export class ReservasService {
  create(createReservaInput: CreateReservaInput) {
    return 'This action adds a new reserva';
  }

  findAll() {
    return `This action returns all reservas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserva`;
  }

  update(id: number, updateReservaInput: UpdateReservaInput) {
    return `This action updates a #${id} reserva`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserva`;
=======
// src/reservas/reservas-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReservasRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/reservas'));
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(this.httpService.get(`/reservas/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
