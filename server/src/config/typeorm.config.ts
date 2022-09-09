import { TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: ['./dist/**/*.model.js'],
            logging: true,
            synchronize: true,
            namingStrategy: new SnakeNamingStrategy(),
            cache: {
                type: "redis",
                options: {
                    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
                },
                ignoreErrors: true
            },
        };
    }
};
