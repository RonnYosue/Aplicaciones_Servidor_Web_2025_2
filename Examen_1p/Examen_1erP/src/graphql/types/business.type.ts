import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType({ description: 'Resumen del carrito con cálculos' })
export class CartSummaryType {
  @Field(() => String)
  cartId: string;

  @Field(() => Float, { description: 'Total del carrito' })
  total: number;

  @Field(() => Int, { description: 'Cantidad de items diferentes' })
  itemCount: number;

  @Field(() => [CartItemDetailType], { description: 'Detalles de los items' })
  items: CartItemDetailType[];

  // Transformaciones adicionales
  @Field(() => Float, { description: 'IVA calculado (16%)' })
  iva: number;

  @Field(() => Float, { description: 'Total con IVA incluido' })
  totalConIva: number;

  @Field(() => String, { description: 'Total formateado como texto' })
  totalFormateado: string;
}

@ObjectType({ description: 'Detalle de item del carrito' })
export class CartItemDetailType {
  @Field()
  productName: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  subtotal: number;

  // Transformación adicional
  @Field({ description: 'Descripción completa del item' })
  descripcion: string;
}

@ObjectType({ description: 'Producto con stock bajo' })
export class LowStockProductType {
  @Field(() => ProductType, { description: 'Datos del producto' })
  producto: ProductType;

  @Field(() => Int, { description: 'Unidades restantes' })
  unidadesRestantes: number;

  @Field(() => String, { description: 'Nivel de urgencia (CRITICO, URGENTE, MODERADO)' })
  nivelUrgencia: string;

  @Field(() => Boolean, { description: 'Requiere reabastecimiento inmediato' })
  requiereReabastecimiento: boolean;
}

@ObjectType({ description: 'Catálogo completo con análisis' })
export class CatalogType {
  @Field(() => [ProductType], { description: 'Todos los productos' })
  productos: ProductType[];

  @Field(() => Int, { description: 'Total de productos' })
  totalProductos: number;

  @Field(() => Int, { description: 'Productos disponibles (stock > 0)' })
  productosDisponibles: number;

  @Field(() => Int, { description: 'Productos agotados (stock = 0)' })
  productosAgotados: number;

  @Field(() => Float, { description: 'Valor total del inventario' })
  valorInventario: number;

  @Field(() => Float, { description: 'Precio promedio' })
  precioPromedio: number;
}
