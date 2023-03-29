import { forwardRef, Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/modules/auth/auth.module"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { User } from "./user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
