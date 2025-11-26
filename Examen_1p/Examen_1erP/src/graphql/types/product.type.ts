import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Producto transformado desde el REST' })
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Nombre del producto' })
  name: string;

  @Field({ nullable: true, description: 'Descripción detallada' })
  description?: string;

  @Field(() => Float, { description: 'Precio unitario del producto' })
  price: number;

  @Field(() => Int, { description: 'Cantidad en inventario' })
  stock: number;

  @Field({ nullable: true, description: 'URL de la imagen del producto' })
  imageUrl?: string;

  @Field({ description: 'Fecha de creación' })
  createdAt: string;

  @Field({ description: 'Fecha de última actualización' })
  updatedAt: string;

  // Campos calculados/transformados
  @Field(() => Boolean, { description: 'Indica si el producto está disponible (stock > 0)' })
  disponible: boolean;

  @Field(() => String, { description: 'Estado del stock (AGOTADO, BAJO, DISPONIBLE, ABUNDANTE)' })
  estadoStock: string;

  @Field(() => Float, { description: 'Precio formateado con descuento simulado del 10%' })
  precioConDescuento: number;
}
