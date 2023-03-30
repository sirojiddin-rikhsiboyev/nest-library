import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Category } from "@/modules/category/category.entity"
import { User } from "@/modules/user/user.entity"
import { Favorite } from "@/modules/favorite/favorite.entity"
import { Book } from "./book.entity"
import { BookService } from "./book.service"
import { BookController } from "./book.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category, User, Favorite])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
