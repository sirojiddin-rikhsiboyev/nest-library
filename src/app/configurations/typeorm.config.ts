import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: "postgres",
    host: configService.get("DB_HOST"),
    port: parseInt(configService.get("DB_PORT"), 10),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_DATABASE"),
    entities: ["dist/**/*.entity{.ts,.js}"],
    logging: false,
    synchronize: true,
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy()
  })
}
