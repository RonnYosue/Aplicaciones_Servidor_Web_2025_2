import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../entities/product.entity';
import { AddCartItemDto } from '../dtos/add-cart-item.dto';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { UpdateCartDto } from '../dtos/update-cart.dto';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createCart(dto?: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepository.create({
      userId: dto?.userId,
      status: 'active', //error
    });
    return await this.cartRepository.save(cart);
  }

  async getCart(id: string): Promise<Cart> {
    const c = await this.cartRepository.findOne({ where: { id } });
    if (!c) throw new NotFoundException('Cart not found');
    return c;
  }

  async addItem(cartId: string, dto: AddCartItemDto): Promise<Cart> {
    const cart = await this.getCart(cartId);
    if (cart.status !== 'active') throw new BadRequestException('Cannot modify a non-active cart');

    const product = await this.productRepository.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < dto.quantity) throw new BadRequestException('Not enough stock');

    // Check if item exists
    let item = cart.items?.find((it) => it.product.id === product.id);
    if (item) {
      item.quantity += dto.quantity;
      await this.cartItemRepository.save(item);
    } else {
      item = this.cartItemRepository.create({ product, quantity: dto.quantity, cart });
      await this.cartItemRepository.save(item);
      cart.items = cart.items ? [...cart.items, item] : [item];
    }

    return this.cartRepository.save(cart);
  }

  async updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = await this.getCart(cartId);
    if (cart.status !== 'active') throw new BadRequestException('Cannot modify a non-active cart');

    const item = await this.cartItemRepository.findOne({ where: { id: itemId }, relations: ['product'] });
    if (!item) throw new NotFoundException('Cart item not found');
    if (quantity <= 0) {
      await this.cartItemRepository.remove(item);
    } else {
      if (!item.product) throw new NotFoundException('Product of cart item not found');
      if (item.product.stock < quantity) throw new BadRequestException('Not enough stock');
      item.quantity = quantity;
      await this.cartItemRepository.save(item);
    }

    const updated = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!updated) throw new NotFoundException('Cart not found after update');
    return updated;
  }

  async removeItem(cartId: string, itemId: string): Promise<Cart> {
    const cart = await this.getCart(cartId);
    if (cart.status !== 'active') throw new BadRequestException('Cannot modify a non-active cart');

    const item = await this.cartItemRepository.findOne({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Cart item not found');

    await this.cartItemRepository.remove(item);
    const updated = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!updated) throw new NotFoundException('Cart not found after remove');
    return updated;
  }

  async checkout(cartId: string): Promise<{ cart: Cart; charged: number }> {
    const cart = await this.getCart(cartId);
    if (!cart.items || cart.items.length === 0) throw new BadRequestException('Cart is empty');
    if (cart.status !== 'active') throw new BadRequestException('Cart is not active');

    // Validate stock again and decrement
    for (const item of cart.items) {
      const product = await this.productRepository.findOne({ where: { id: item.product.id } });
      if (!product) throw new NotFoundException(`Product ${item.product.id} not found`);
      if (product.stock < item.quantity) throw new BadRequestException(`Not enough stock for product ${product.id}`);
    }

    for (const item of cart.items) {
      const product = await this.productRepository.findOne({ where: { id: item.product.id } });
      if (!product) throw new NotFoundException(`Product ${item.product.id} not found during checkout`);
      product.stock = product.stock - item.quantity;
      await this.productRepository.save(product);
    }

    cart.status = 'ordered';
    await this.cartRepository.save(cart);

    const total = cart.getTotal();
    return { cart, charged: total };
  }
}
