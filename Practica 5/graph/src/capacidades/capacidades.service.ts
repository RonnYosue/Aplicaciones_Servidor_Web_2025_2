<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateCapacidadeInput } from './dto/create-capacidade.input';
import { UpdateCapacidadeInput } from './dto/update-capacidade.input';

@Injectable()
export class CapacidadesService {
  create(createCapacidadeInput: CreateCapacidadeInput) {
    return 'This action adds a new capacidade';
  }

  findAll() {
    return `This action returns all capacidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} capacidade`;
  }

  update(id: number, updateCapacidadeInput: UpdateCapacidadeInput) {
    return `This action updates a #${id} capacidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} capacidade`;
=======
// src/capacidades/capacidades-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CapacidadesRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/capacidades'));
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(this.httpService.get(`/capacidades/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
