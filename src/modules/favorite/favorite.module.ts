import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Book } from "@/modules/book/book.entity"
import { User } from "@/modules/user/user.entity"
import { FavoriteService } from "./favorite.service"
import { FavoriteController } from "./favorite.controller"
import { Favorite } from "./favorite.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Book, User])],
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule {}
