<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateIncidenciaInput } from './dto/create-incidencia.input';
import { UpdateIncidenciaInput } from './dto/update-incidencia.input';

@Injectable()
export class IncidenciasService {
  create(createIncidenciaInput: CreateIncidenciaInput) {
    return 'This action adds a new incidencia';
  }

  findAll() {
    return `This action returns all incidencias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incidencia`;
  }

  update(id: number, updateIncidenciaInput: UpdateIncidenciaInput) {
    return `This action updates a #${id} incidencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} incidencia`;
=======
// src/incidencias/incidencias-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IncidenciasRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/incidencias'));
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(this.httpService.get(`/incidencias/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
