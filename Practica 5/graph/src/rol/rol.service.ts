<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateRolInput } from './dto/create-rol.input';
import { UpdateRolInput } from './dto/update-rol.input';

@Injectable()
export class RolService {
  create(createRolInput: CreateRolInput) {
    return 'This action adds a new rol';
  }

  findAll() {
    return `This action returns all rol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolInput: UpdateRolInput) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
=======
// src/rol/rol-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RolRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/rol'));
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(this.httpService.get(`/rol/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
