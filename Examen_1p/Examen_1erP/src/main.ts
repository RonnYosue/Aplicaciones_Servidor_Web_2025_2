import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validación global con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Transforma payloads a instancias de DTOs
    }),
  );

  // Habilitar CORS para desarrollo
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   🚀 Servidor NestJS corriendo en http://localhost:${port}  ║
║                                                           ║
║   🎯 GraphQL Apollo Studio:                               ║
║   • http://localhost:${port}/graphql                          ║
║                                                           ║
║   📦 REST API Endpoints:                                  ║
║   • GET    /products                                      ║
║   • POST   /products                                      ║
║   • GET    /products/:id                                  ║
║   • PUT    /products/:id                                  ║
║   • DELETE /products/:id                                  ║
║   • GET    /products/low-stock/:threshold                 ║
║                                                           ║
║   • POST   /carts                                         ║
║   • GET    /carts/:id                                     ║
║   • PUT    /carts/:id                                     ║
║   • DELETE /carts/:id                                     ║
║   • POST   /carts/:id/items                               ║
║   • PUT    /carts/:cartId/items/:itemId                   ║
║   • DELETE /carts/:cartId/items/:itemId                   ║
║   • POST   /carts/:id/checkout        [ESPECIALIZADO]    ║
║   • GET    /carts/:id/total           [ESPECIALIZADO]    ║
║                                                           ║
║   • POST   /cart-items                                    ║
║                                                           ║
║   🗄️  Base de datos: database.sqlite (SQLite)            ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
