import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/modules/auth/auth.module"
import { Book } from "@/modules/book/book.entity"
import { Favorite } from "@/modules/favorite/favorite.entity"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { User } from "./user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Favorite]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
