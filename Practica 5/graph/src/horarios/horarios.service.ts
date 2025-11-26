<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateHorarioInput } from './dto/create-horario.input';
import { UpdateHorarioInput } from './dto/update-horario.input';

@Injectable()
export class HorariosService {
  create(createHorarioInput: CreateHorarioInput) {
    return 'This action adds a new horario';
  }

  findAll() {
    return `This action returns all horarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horario`;
  }

  update(id: number, updateHorarioInput: UpdateHorarioInput) {
    return `This action updates a #${id} horario`;
  }

  remove(id: number) {
    return `This action removes a #${id} horario`;
=======
// src/horarios/horarios-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HorariosRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/horarios'));
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(this.httpService.get(`/horarios/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
