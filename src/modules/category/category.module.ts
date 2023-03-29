import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Book } from "@/modules/book/book.entity"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"
import { Category } from "./category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
