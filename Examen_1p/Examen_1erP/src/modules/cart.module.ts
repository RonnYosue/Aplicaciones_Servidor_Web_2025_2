import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../entities/product.entity';
import { CartService } from '../services/cart.service';
import { CartController } from '../rest/cart.controller';
import { CartItemController } from '../rest/cart-item.controller';
import { WebhookModule } from './webhook.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product]),
    WebhookModule, // Importar para usar WebhookService
  ],
  controllers: [CartController, CartItemController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
