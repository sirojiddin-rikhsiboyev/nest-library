import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "library",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};
