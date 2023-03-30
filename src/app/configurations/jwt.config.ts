import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModuleAsyncOptions } from "@nestjs/jwt"

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>("JWT_SECRET"),
    signOptions: { expiresIn: "24h" }
  })
}
