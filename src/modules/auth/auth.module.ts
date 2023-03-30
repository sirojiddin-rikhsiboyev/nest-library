import { forwardRef, Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { jwtConfig } from "@/app/configurations"

import { UserModule } from "@/modules/user/user.module"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { AuthGuard } from "./auth.guard"

@Module({
  imports: [forwardRef(() => UserModule), JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule {}
