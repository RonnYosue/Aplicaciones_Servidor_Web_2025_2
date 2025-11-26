import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { CreateAsistenciaInput } from './dto/create-asistencia.input';
import { UpdateAsistenciaInput } from './dto/update-asistencia.input';

@Injectable()
export class AsistenciasService {
  create(createAsistenciaInput: CreateAsistenciaInput) {
    return 'This action adds a new asistencia';
  }

  findAll() {
    return `This action returns all asistencias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, updateAsistenciaInput: UpdateAsistenciaInput) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
=======
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AsistenciasRestService {
  private readonly baseUrl = 'hhttp://localhost:4000/api/asistencias';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}`)
    );
    return response.data;
  }

  async findOne(id: string): Promise<any> {
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${id}`)
    );
    return response.data;
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
  }
}
