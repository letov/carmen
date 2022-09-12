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
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}.local`,
          isGlobal: true,
      }),
      TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
      GraphQLModule.forRoot<ApolloDriverConfig>(GraphQLConfig),
      CacheModule.register(cacheConfig),
      CustomerModule,
      LoyaltyModule,
      FileModule,
      ServeStaticModule.forRoot({
          rootPath: `${process.cwd()}/${process.env.UPLOAD_PATH}`,
      }),
  ],
})
export class AppModule {}
