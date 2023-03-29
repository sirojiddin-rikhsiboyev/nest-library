import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Book, BookModule } from "@/modules/book"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"
import { Category } from "./category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book]), forwardRef(() => BookModule)],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
