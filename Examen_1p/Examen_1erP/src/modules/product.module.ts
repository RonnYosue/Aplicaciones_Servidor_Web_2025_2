import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { ProductController } from '../rest/product.controller';
import { WebhookModule } from './webhook.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    WebhookModule, // Importar para usar WebhookService
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
