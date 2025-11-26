import { IsString, IsOptional, IsEnum } from 'class-validator';
import { CartStatus } from '../entities/cart.entity';

export class UpdateCartDto {
  @IsOptional()
  @IsEnum(['active', 'ordered', 'cancelled'], { 
    message: 'El estado debe ser: active, ordered o cancelled' 
  })
  status?: CartStatus;

  @IsOptional()
  @IsString()
  userId?: string;
}
