import { IsString, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsOptional()
  @IsString()
  userId?: string;
}
