<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateEquipoInput } from './dto/create-equipo.input';
import { UpdateEquipoInput } from './dto/update-equipo.input';

@Injectable()
export class EquiposService {
  create(createEquipoInput: CreateEquipoInput) {
    return 'This action adds a new equipo';
  }

  findAll() {
    return `This action returns all equipos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipo`;
  }

  update(id: number, updateEquipoInput: UpdateEquipoInput) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
=======
// src/equipos/equipos-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EquiposRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/equipos'));
    return response.data;
  }

  async findOne(id: string) {
    const response = await firstValueFrom(this.httpService.get(`/equipos/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
