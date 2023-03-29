import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from "@/app/configurations/typeorm.config"

import { BookModule } from "./book"
import { CategoryModule } from "./category"

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BookModule, CategoryModule],
  controllers: [],
  providers: []
})
export class AppModule {}
