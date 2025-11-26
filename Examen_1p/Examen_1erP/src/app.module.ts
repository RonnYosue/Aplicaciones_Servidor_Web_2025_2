import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './modules/product.module';
import { CartModule } from './modules/cart.module';
import { WebhookModule } from './modules/webhook.module';
import { GraphqlModule } from './graphql/graphql.module';
import { Product } from './entities/product.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Module({
  imports: [
    // Configuración de TypeORM con SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Product, Cart, CartItem],
      synchronize: true, // AUTO-CREA TABLAS (solo desarrollo, no usar en producción)
      logging: false, // Deshabilito logging para ver mejor los logs de GraphQL
    }),
    // Configuración de GraphQL con Apollo
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Habilitar GraphQL Playground
      introspection: true, // Habilitar introspección
    }),
    ProductModule,
    CartModule,
    WebhookModule, // Módulo de WebSocket + Webhook
    GraphqlModule, // Módulo de GraphQL (consume REST)
  ],
})
export class AppModule {}
