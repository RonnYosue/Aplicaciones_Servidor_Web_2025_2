import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { WebhookService } from '../services/webhook.service';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { UpdateCartDto } from '../dtos/update-cart.dto';
import { AddCartItemDto } from '../dtos/add-cart-item.dto';
import { Cart } from '../entities/cart.entity';

@Controller('carts')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly webhookService: WebhookService, // Inyectar WebhookService
  ) {}

  // CREATE - POST /carts
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartService.createCart(createCartDto);
    
    // Invocar webhook (REST → Webhook → WebSocket)
    await this.webhookService.processNotification({
      entity: 'Cart',
      operation: 'CREATE',
      data: cart,
    });
    
    return cart;
  }

  // READ ONE - GET /carts/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cart> {
    return this.cartService.getCart(id);
  }

  // UPDATE - PUT /carts/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const cart = await this.cartService.getCart(id);
    if (updateCartDto.status) {
      cart.status = updateCartDto.status;
    }
    if (updateCartDto.userId !== undefined) {
      cart.userId = updateCartDto.userId;
    }
    // Aquí normalmente usarías un cartRepository, pero lo simplificamos
    return cart;
  }

  // DELETE - DELETE /carts/:id (cancelar carrito)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const cart = await this.cartService.getCart(id);
    cart.status = 'cancelled';
    // En producción guardarías el cambio en BD
  }

  // ============= ENDPOINTS ESPECIALIZADOS DEL DOMINIO =============

  // POST /carts/:id/items - Añadir producto al carrito
  @Post(':id/items')
  @HttpCode(HttpStatus.CREATED)
  async addItem(
    @Param('id') cartId: string,
    @Body() addItemDto: AddCartItemDto,
  ): Promise<Cart> {
    const cart = await this.cartService.addItem(cartId, addItemDto);
    
    // Invocar webhook (REST → Webhook → WebSocket)
    await this.webhookService.processNotification({
      entity: 'Cart',
      operation: 'UPDATE',
      data: { action: 'item-added', cart },
    });
    
    return cart;
  }

  // PUT /carts/:cartId/items/:itemId - Actualizar cantidad de un item
  @Put(':cartId/items/:itemId')
  async updateItemQuantity(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    const cart = await this.cartService.updateItemQuantity(cartId, itemId, quantity);
    
    // Invocar webhook (REST → Webhook → WebSocket)
    await this.webhookService.processNotification({
      entity: 'CartItem',
      operation: 'UPDATE',
      data: { action: 'quantity-updated', cart, itemId, quantity },
    });
    
    return cart;
  }

  // DELETE /carts/:cartId/items/:itemId - Eliminar item del carrito
  @Delete(':cartId/items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItem(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ): Promise<void> {
    await this.cartService.removeItem(cartId, itemId);
  }

  // POST /carts/:id/checkout - Procesar el checkout (endpoint especializado clave)
  @Post(':id/checkout')
  async checkout(@Param('id') cartId: string): Promise<{ cart: Cart; charged: number }> {
    return this.cartService.checkout(cartId);
  }

  // GET /carts/:id/total - Calcular total del carrito (endpoint especializado)
  @Get(':id/total')
  async getTotal(@Param('id') cartId: string): Promise<{ total: number }> {
    const cart = await this.cartService.getCart(cartId);
    return { total: cart.getTotal() };
  }
}
