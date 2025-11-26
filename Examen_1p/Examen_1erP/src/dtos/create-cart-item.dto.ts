import { IsString, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  @IsUUID('4', { message: 'El productId debe ser un UUID válido' })
  productId: string;

  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;

  @IsString()
  @IsUUID('4', { message: 'El cartId debe ser un UUID válido' })
  cartId: string;
}
