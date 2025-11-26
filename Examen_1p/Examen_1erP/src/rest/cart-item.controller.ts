import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { CartItem } from '../entities/cart-item.entity';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartService: CartService) {}

  // CREATE - POST /cart-items
  // Nota: Normalmente se haría via /carts/:id/items, pero cumplimos con CRUD por entidad
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    // Reutilizamos la lógica de addItem pero retornamos el item creado
    const cart = await this.cartService.addItem(createCartItemDto.cartId, {
      productId: createCartItemDto.productId,
      quantity: createCartItemDto.quantity,
    });
    
    // Encontrar el item recién creado
    const item = cart.items.find(i => i.product.id === createCartItemDto.productId);
    if (!item) throw new Error('Item not found after creation');
    return item;
  }

  // READ ONE - GET /cart-items/:id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CartItem> {
    // Aquí normalmente tendrías un CartItemService o Repository
    // Por simplicidad, buscamos en todos los carritos (no óptimo en producción)
    throw new Error('Not implemented - use GET /carts/:id to see items');
  }

  // UPDATE - PUT /cart-items/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<CartItem> {
    // En producción necesitarías saber el cartId primero
    throw new Error('Not implemented - use PUT /carts/:cartId/items/:itemId');
  }

  // DELETE - DELETE /cart-items/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    throw new Error('Not implemented - use DELETE /carts/:cartId/items/:itemId');
  }
}
