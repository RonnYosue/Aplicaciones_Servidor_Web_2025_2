<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateRutinaInput } from './dto/create-rutina.input';
import { UpdateRutinaInput } from './dto/update-rutina.input';

@Injectable()
export class RutinaService {
  create(createRutinaInput: CreateRutinaInput) {
    return 'This action adds a new rutina';
  }

  findAll() {
    return `This action returns all rutina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rutina`;
  }

  update(id: number, updateRutinaInput: UpdateRutinaInput) {
    return `This action updates a #${id} rutina`;
  }

  remove(id: number) {
    return `This action removes a #${id} rutina`;
=======
// src/rutina/rutina-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RutinaRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/rutina'));
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(this.httpService.get(`/rutina/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
