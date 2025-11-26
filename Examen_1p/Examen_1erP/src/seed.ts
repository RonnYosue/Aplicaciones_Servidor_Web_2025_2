import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';

async function seed() {
  console.log('🌱 Iniciando seed de datos...\n');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const productService = app.get(ProductService);
  const cartService = app.get(CartService);

  try {
    // Crear productos de ejemplo
    console.log('📦 Creando productos...');
    const product1 = await productService.create({
      name: 'Camisa Blanca Premium',
      description: 'Camisa de algodón 100% egipcio',
      price: 299.99,
      stock: 50,
      imageUrl: 'https://example.com/camisa-blanca.jpg',
    });
    console.log(`✅ Producto creado: ${product1.name} (ID: ${product1.id})`);

    const product2 = await productService.create({
      name: 'Pantalón Jean Azul',
      description: 'Jean clásico corte recto',
      price: 499.99,
      stock: 30,
      imageUrl: 'https://example.com/jean-azul.jpg',
    });
    console.log(`✅ Producto creado: ${product2.name} (ID: ${product2.id})`);

    const product3 = await productService.create({
      name: 'Zapatillas Deportivas',
      description: 'Zapatillas para running profesional',
      price: 899.99,
      stock: 5,
      imageUrl: 'https://example.com/zapatillas.jpg',
    });
    console.log(`✅ Producto creado: ${product3.name} (ID: ${product3.id})`);

    const product4 = await productService.create({
      name: 'Chaqueta de Cuero',
      description: 'Chaqueta de cuero genuino',
      price: 1299.99,
      stock: 2,
      imageUrl: 'https://example.com/chaqueta.jpg',
    });
    console.log(`✅ Producto creado: ${product4.name} (ID: ${product4.id})`);

    // Crear un carrito de ejemplo
    console.log('\n🛒 Creando carrito de ejemplo...');
    const cart = await cartService.createCart({ userId: 'usuario-demo' });
    console.log(`✅ Carrito creado (ID: ${cart.id})`);

    // Añadir productos al carrito
    await cartService.addItem(cart.id, { productId: product1.id, quantity: 2 });
    console.log(`✅ Añadido: 2x ${product1.name}`);

    await cartService.addItem(cart.id, { productId: product3.id, quantity: 1 });
    console.log(`✅ Añadido: 1x ${product3.name}`);

    const cartFinal = await cartService.getCart(cart.id);
    console.log(`\n💰 Total del carrito: $${cartFinal.getTotal().toFixed(2)}`);

    console.log('\n✅ Seed completado exitosamente!\n');
    console.log('📋 Resumen:');
    console.log(`   - ${(await productService.findAll()).length} productos creados`);
    console.log(`   - 1 carrito de ejemplo con ${cartFinal.items.length} items`);
    console.log(`\n🚀 Puedes arrancar el servidor con: npm run start:dev\n`);

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  } finally {
    await app.close();
  }
}

seed();
