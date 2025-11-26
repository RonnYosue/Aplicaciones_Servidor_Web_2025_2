import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType({ description: 'Item de carrito transformado' })
export class CartItemType {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { description: 'Cantidad del producto' })
  quantity: number;

  @Field(() => ProductType, { description: 'Producto asociado' })
  product: ProductType;

  @Field(() => Float, { description: 'Subtotal calculado (precio * cantidad)' })
  subtotal: number;

  @Field({ description: 'Fecha de creación' })
  createdAt: string;
}

@ObjectType({ description: 'Carrito de compras transformado desde el REST' })
export class CartType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true, description: 'ID del usuario dueño del carrito' })
  userId?: string;

  @Field(() => String, { description: 'Estado del carrito (active, ordered, cancelled)' })
  status: string;

  @Field(() => [CartItemType], { description: 'Items del carrito' })
  items: CartItemType[];

  @Field({ description: 'Fecha de creación' })
  createdAt: string;

  @Field({ description: 'Fecha de última actualización' })
  updatedAt: string;

  // Campos calculados/transformados
  @Field(() => Float, { description: 'Total del carrito (suma de subtotales)' })
  total: number;

  @Field(() => Int, { description: 'Cantidad total de items en el carrito' })
  cantidadItems: number;

  @Field(() => Boolean, { description: 'Indica si el carrito está activo' })
  estaActivo: boolean;

  @Field(() => String, { description: 'Descripción del estado del carrito' })
  estadoDescripcion: string;
}
