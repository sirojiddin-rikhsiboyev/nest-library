import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { typeOrmConfig } from "@/app/configurations"

import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { BookModule } from "./book/book.module"
import { CategoryModule } from "./category/category.module"
import { ProfileModule } from "./profile/profile.module"
import { FavoriteModule } from "./favorite/favorite.module"

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig), AuthModule, ProfileModule, UserModule, CategoryModule, BookModule, FavoriteModule],
  controllers: [],
  providers: []
})
export class AppModule {}
