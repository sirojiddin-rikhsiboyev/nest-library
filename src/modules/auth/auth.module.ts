import { forwardRef, Module } from "@nestjs/common"
import { UserModule } from "@/modules/user/user.module"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [forwardRef(() => UserModule), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
