<<<<<<< HEAD
import { Injectable, HttpServi**ce } from '@nestjs/common';

@Injectable()
export class ExampleService {
  private readonly baseUrl = 'https://api.example.com'; // Reemplaza con tu URL base
=======
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ExampleService {
  private readonly baseUrl = 'http://localhost:4000/api'; // Reemplaza con tu URL base
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any> {
<<<<<<< HEAD
    const response = await this.httpService.get(`${this.baseUrl}/examples`).toPromise();
=======
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/examples`)
    );
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
    return response.data;
  }

  async findOne(id: string): Promise<any> {
<<<<<<< HEAD
    const response = await this.httpService.get(`${this.baseUrl}/examples/${id}`).toPromise();
=======
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/examples/${id}`)
    );
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
    return response.data;
  }
}
