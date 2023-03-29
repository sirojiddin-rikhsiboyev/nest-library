import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Category, CategoryModule } from "@/modules/category"
import { Book } from "./book.entity"
import { BookService } from "./book.service"
import { BookController } from "./book.controller"

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category]), forwardRef(() => CategoryModule)],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
