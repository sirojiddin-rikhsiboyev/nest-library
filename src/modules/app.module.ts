import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from "@/app/configurations/typeorm.config"

import { BookModule } from "./book/book.module"
import { CategoryModule } from "./category/category.module"
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BookModule, CategoryModule, UserModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
