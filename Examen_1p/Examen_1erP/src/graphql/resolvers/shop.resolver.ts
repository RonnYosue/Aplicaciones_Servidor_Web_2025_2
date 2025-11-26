import { Resolver, Query, Args, ID, Int } from '@nestjs/graphql';
import { GraphqlRestService } from '../services/graphql-rest.service';
import { ProductType } from '../types/product.type';
import { CartType } from '../types/cart.type';
import {
  CartSummaryType,
  LowStockProductType,
  CatalogType,
} from '../types/business.type';

@Resolver()
export class ShopResolver {
  constructor(private readonly restService: GraphqlRestService) {}

  // ============================================================
  // CONSULTA DE NEGOCIO 1: Catálogo completo con análisis
  // Basado en la imagen: necesidad de ver productos disponibles
  // ============================================================
  @Query(() => CatalogType, {
    name: 'catalogo',
    description:
      'Obtiene el catálogo completo con análisis estadístico del inventario',
  })
  async getCatalog(): Promise<CatalogType> {
    return this.restService.getCatalogWithAnalytics();
  }

  // ============================================================
  // CONSULTA DE NEGOCIO 2: Productos con transformación
  // Basado en la imagen: listado de productos en el e-commerce
  // ============================================================
  @Query(() => [ProductType], {
    name: 'productos',
    description: 'Lista todos los productos con datos transformados',
  })
  async getAllProducts(): Promise<ProductType[]> {
    return this.restService.getAllProducts();
  }

  @Query(() => ProductType, {
    name: 'producto',
    description: 'Obtiene un producto por ID con transformaciones',
  })
  async getProductById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<ProductType> {
    return this.restService.getProductById(id);
  }

  // ============================================================
  // CONSULTA DE NEGOCIO 3: Carrito con resumen detallado
  // Basado en la imagen: vista del carrito de compras lateral
  // ============================================================
  @Query(() => CartType, {
    name: 'carrito',
    description: 'Obtiene un carrito por ID con datos transformados',
  })
  async getCart(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CartType> {
    return this.restService.getCartById(id);
  }

  @Query(() => CartSummaryType, {
    name: 'resumenCarrito',
    description:
      'Obtiene el resumen del carrito con cálculos de IVA y totales formateados',
  })
  async getCartSummary(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CartSummaryType> {
    return this.restService.getCartSummary(id);
  }

  // ============================================================
  // CONSULTA DE NEGOCIO 4: Productos con stock bajo (análisis)
  // Basado en necesidad del negocio: gestión de inventario
  // ============================================================
  @Query(() => [LowStockProductType], {
    name: 'productosStockBajo',
    description:
      'Obtiene productos con stock bajo con análisis de urgencia y reabastecimiento',
  })
  async getLowStockProducts(
    @Args('umbral', {
      type: () => Int,
      defaultValue: 10,
      description: 'Umbral de stock considerado bajo',
    })
    threshold: number,
  ): Promise<LowStockProductType[]> {
    return this.restService.getLowStockProducts(threshold);
  }

  // ============================================================
  // CONSULTA DE NEGOCIO 5: Productos disponibles para compra
  // Basado en la imagen: mostrar solo productos comprables
  // ============================================================
  @Query(() => [ProductType], {
    name: 'productosDisponibles',
    description: 'Lista solo los productos con stock disponible (stock > 0)',
  })
  async getAvailableProducts(): Promise<ProductType[]> {
    const allProducts = await this.restService.getAllProducts();
    return allProducts.filter((p) => p.disponible);
  }

  // ============================================================
  // CONSULTA DE NEGOCIO 6: Productos con descuento
  // Basado en funcionalidad común de e-commerce
  // ============================================================
  @Query(() => [ProductType], {
    name: 'productosConDescuento',
    description: 'Lista productos mostrando precio con descuento del 10%',
  })
  async getProductsWithDiscount(): Promise<ProductType[]> {
    return this.restService.getAllProducts();
  }
}
