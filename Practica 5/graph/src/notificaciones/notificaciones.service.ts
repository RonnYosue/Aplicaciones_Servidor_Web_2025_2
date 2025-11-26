<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateNotificacioneInput } from './dto/create-notificacione.input';
import { UpdateNotificacioneInput } from './dto/update-notificacione.input';

@Injectable()
export class NotificacionesService {
  create(createNotificacioneInput: CreateNotificacioneInput) {
    return 'This action adds a new notificacione';
  }

  findAll() {
    return `This action returns all notificaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacione`;
  }

  update(id: number, updateNotificacioneInput: UpdateNotificacioneInput) {
    return `This action updates a #${id} notificacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacione`;
=======
// src/notificaciones/notificaciones-rest.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificacionesRestService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const response = await firstValueFrom(this.httpService.get('/notificaciones'));
    return response.data;
  }

  async findOne(id: number) {
    const response = await firstValueFrom(this.httpService.get(`/notificaciones/${id}`));
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
