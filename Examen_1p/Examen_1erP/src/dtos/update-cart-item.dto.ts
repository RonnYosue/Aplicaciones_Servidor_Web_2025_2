import { IsNumber, IsString, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity?: number;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'El productId debe ser un UUID válido' })
  productId?: string;
}
