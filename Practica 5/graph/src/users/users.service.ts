<<<<<<< HEAD
import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserType } from '../types/user.type';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<UserType[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('/users')
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener usuarios',
        error.response?.status || 500,
      );
    }
  }

  async findOne(id: string): Promise<UserType> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`/users/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al obtener el usuario',
        error.response?.status || 500,
      );
    }
  }
}
=======
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersRestService {
  private readonly baseUrl = 'http://localhost:4000/api/users';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}`)
    );
    return response.data;
  }

  // Agrega este método
  async findOne(id: string): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${id}`)
    );
    return response.data;
  }
}




>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
