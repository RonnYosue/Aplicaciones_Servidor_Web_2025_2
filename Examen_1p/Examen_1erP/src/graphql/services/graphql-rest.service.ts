import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProductType } from '../types/product.type';
import { CartType, CartItemType } from '../types/cart.type';
import {
  CartSummaryType,
  CartItemDetailType,
  LowStockProductType,
  CatalogType,
} from '../types/business.type';

@Injectable()
export class GraphqlRestService {
  private readonly logger = new Logger(GraphqlRestService.name);
  private readonly REST_BASE_URL = 'http://localhost:3000';

  constructor(private readonly httpService: HttpService) {}

  /**
   * TRANSFORMACIÓN: Obtener todos los productos y transformarlos
   */
  async getAllProducts(): Promise<ProductType[]> {
    this.logger.log('📡 Consultando REST: GET /products');
    
    const response = await firstValueFrom(
      this.httpService.get(`${this.REST_BASE_URL}/products`),
    );

    const products = response.data;
    this.logger.log(`✅ Obtenidos ${products.length} productos del REST`);

    // Transformar cada producto
    return products.map((p: any) => this.transformProduct(p));
  }

  /**
   * TRANSFORMACIÓN: Obtener un producto por ID y transformarlo
   */
  async getProductById(id: string): Promise<ProductType> {
    this.logger.log(`📡 Consultando REST: GET /products/${id}`);
    
    const response = await firstValueFrom(
      this.httpService.get(`${this.REST_BASE_URL}/products/${id}`),
    );

    const product = response.data;
    return this.transformProduct(product);
  }

  /**
   * TRANSFORMACIÓN: Obtener productos con stock bajo
   */
  async getLowStockProducts(threshold: number): Promise<LowStockProductType[]> {
    this.logger.log(`📡 Consultando REST: GET /products/low-stock/${threshold}`);
    
    const response = await firstValueFrom(
      this.httpService.get(`${this.REST_BASE_URL}/products/low-stock/${threshold}`),
    );

    const products = response.data;
    this.logger.log(`✅ Obtenidos ${products.length} productos con stock bajo`);

    // Transformar con análisis adicional
    return products.map((p: any) => this.transformLowStockProduct(p, threshold));
  }

  /**
   * TRANSFORMACIÓN: Obtener carrito por ID con datos transformados
   */
  async getCartById(id: string): Promise<CartType> {
    this.logger.log(`📡 Consultando REST: GET /carts/${id}`);
    
    const response = await firstValueFrom(
      this.httpService.get(`${this.REST_BASE_URL}/carts/${id}`),
    );

    const cart = response.data;
    return this.transformCart(cart);
  }

  /**
   * TRANSFORMACIÓN: Obtener resumen del carrito con cálculos
   */
  async getCartSummary(id: string): Promise<CartSummaryType> {
    this.logger.log(`📡 Consultando REST: GET /carts/${id}/total`);
    
    const response = await firstValueFrom(
      this.httpService.get(`${this.REST_BASE_URL}/carts/${id}/total`),
    );

    const summary = response.data;
    return this.transformCartSummary(summary);
  }

  /**
   * CONSULTA DE NEGOCIO 1: Catálogo completo con análisis estadístico
   */
  async getCatalogWithAnalytics(): Promise<CatalogType> {
    this.logger.log('📊 Consultando catálogo con análisis de negocio');
    
    const productos = await this.getAllProducts();

    const disponibles = productos.filter((p) => p.stock > 0).length;
    const agotados = productos.filter((p) => p.stock === 0).length;
    const valorInventario = productos.reduce(
      (acc, p) => acc + p.price * p.stock,
      0,
    );
    const precioPromedio =
      productos.reduce((acc, p) => acc + p.price, 0) / productos.length || 0;

    return {
      productos,
      totalProductos: productos.length,
      productosDisponibles: disponibles,
      productosAgotados: agotados,
      valorInventario,
      precioPromedio: Math.round(precioPromedio * 100) / 100,
    };
  }

  /**
   * TRANSFORMACIÓN PRIVADA: Transforma producto REST a GraphQL
   */
  private transformProduct(restProduct: any): ProductType {
    const disponible = restProduct.stock > 0;
    
    let estadoStock = 'AGOTADO';
    if (restProduct.stock > 20) estadoStock = 'ABUNDANTE';
    else if (restProduct.stock > 10) estadoStock = 'DISPONIBLE';
    else if (restProduct.stock > 0) estadoStock = 'BAJO';

    const precioConDescuento = Math.round(restProduct.price * 0.9 * 100) / 100;

    return {
      id: restProduct.id,
      name: restProduct.name,
      description: restProduct.description,
      price: restProduct.price,
      stock: restProduct.stock,
      imageUrl: restProduct.imageUrl,
      createdAt: restProduct.createdAt,
      updatedAt: restProduct.updatedAt,
      disponible,
      estadoStock,
      precioConDescuento,
    };
  }

  /**
   * TRANSFORMACIÓN PRIVADA: Transforma producto con stock bajo
   */
  private transformLowStockProduct(
    restProduct: any,
    threshold: number,
  ): LowStockProductType {
    const producto = this.transformProduct(restProduct);
    const porcentaje = (restProduct.stock / threshold) * 100;

    let nivelUrgencia = 'MODERADO';
    if (porcentaje < 20) nivelUrgencia = 'CRITICO';
    else if (porcentaje < 50) nivelUrgencia = 'URGENTE';

    return {
      producto,
      unidadesRestantes: restProduct.stock,
      nivelUrgencia,
      requiereReabastecimiento: porcentaje < 30,
    };
  }

  /**
   * TRANSFORMACIÓN PRIVADA: Transforma carrito REST a GraphQL
   */
  private transformCart(restCart: any): CartType {
    const items = (restCart.items || []).map((item: any) =>
      this.transformCartItem(item),
    );

    const total = items.reduce((acc: number, item: CartItemType) => acc + item.subtotal, 0);
    const cantidadItems = items.reduce((acc: number, item: CartItemType) => acc + item.quantity, 0);
    const estaActivo = restCart.status === 'active';

    let estadoDescripcion = 'Carrito activo';
    if (restCart.status === 'ordered') estadoDescripcion = 'Pedido realizado';
    if (restCart.status === 'cancelled') estadoDescripcion = 'Carrito cancelado';

    return {
      id: restCart.id,
      userId: restCart.userId,
      status: restCart.status,
      items,
      createdAt: restCart.createdAt,
      updatedAt: restCart.updatedAt,
      total: Math.round(total * 100) / 100,
      cantidadItems,
      estaActivo,
      estadoDescripcion,
    };
  }

  /**
   * TRANSFORMACIÓN PRIVADA: Transforma item de carrito
   */
  private transformCartItem(restItem: any): CartItemType {
    const product = this.transformProduct(restItem.product);
    const subtotal = restItem.quantity * restItem.product.price;

    return {
      id: restItem.id,
      quantity: restItem.quantity,
      product,
      subtotal: Math.round(subtotal * 100) / 100,
      createdAt: restItem.createdAt,
    };
  }

  /**
   * TRANSFORMACIÓN PRIVADA: Transforma resumen de carrito
   */
  private transformCartSummary(restSummary: any): CartSummaryType {
    const iva = restSummary.total * 0.16;
    const totalConIva = restSummary.total + iva;
    const totalFormateado = `$${totalConIva.toFixed(2)} MXN`;

    const items = restSummary.items.map((item: any) => ({
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
      descripcion: `${item.quantity}x ${item.productName} a $${item.unitPrice} c/u`,
    }));

    return {
      cartId: restSummary.cartId,
      total: restSummary.total,
      itemCount: restSummary.itemCount,
      items,
      iva: Math.round(iva * 100) / 100,
      totalConIva: Math.round(totalConIva * 100) / 100,
      totalFormateado,
    };
  }
}
