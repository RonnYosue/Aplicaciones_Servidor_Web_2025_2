import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { WebhookService } from '../services/webhook.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly webhookService: WebhookService, // Inyectar WebhookService
  ) {}

  // CREATE - POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productService.create(createProductDto);
    
    // Invocar webhook (REST → Webhook → WebSocket)
    await this.webhookService.processNotification({
      entity: 'Product',
      operation: 'CREATE',
      data: product,
    });
    
    return product;
  }

  // READ ALL - GET /products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // READ ONE - GET /products/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  // UPDATE - PUT /products/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productService.update(id, updateProductDto);
    
    // Invocar webhook (REST → Webhook → WebSocket)
    await this.webhookService.processNotification({
      entity: 'Product',
      operation: 'UPDATE',
      data: product,
    });
    
    return product;
  }

  // DELETE - DELETE /products/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }

  // ENDPOINT ESPECIALIZADO - GET /products/low-stock/:threshold
  // Obtiene productos con stock bajo (útil para alertas de inventario)
  @Get('low-stock/:threshold')
  async getLowStock(@Param('threshold') threshold: string): Promise<Product[]> {
    const thresholdNum = parseInt(threshold, 10);
    const allProducts = await this.productService.findAll();
    return allProducts.filter(p => p.stock < thresholdNum);
  }
}
