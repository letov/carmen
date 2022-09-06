import { CacheModule, Module } from '@nestjs/common';
import { typeOrmAsyncConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLConfig } from "./config/graphql.config";
import { CustomerModule} from "./customer/customer.module";
import { LoyaltyModule } from "./loyality/loyalty.module";
import { cacheConfig } from "./config/cache.config";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/src/config/env/${process.env.NODE_ENV}.env`,
          isGlobal: true,
      }),
      TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
      GraphQLModule.forRoot<ApolloDriverConfig>(GraphQLConfig),
      CacheModule.register(cacheConfig),
      CustomerModule,
      LoyaltyModule,
  ],
})
export class AppModule {}
