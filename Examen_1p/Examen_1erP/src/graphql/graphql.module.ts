import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShopResolver } from './resolvers/shop.resolver';
import { GraphqlRestService } from './services/graphql-rest.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ShopResolver, GraphqlRestService],
  exports: [GraphqlRestService],
})
export class GraphqlModule {}
