import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { Public } from "@/app/decorators"
import { LoginRequestDto, LoginResponseDto, RegistrationRequestDto, RegistrationResponseDto } from "./dtos"
import { AuthService } from "./auth.service"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("registration")
  async registration(@Body() dto: RegistrationRequestDto): AsyncResponseDto<RegistrationResponseDto> {
    return new ResponseDto(await this.authService.registration(dto))
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginRequestDto): AsyncResponseDto<LoginResponseDto> {
    return new ResponseDto(await this.authService.login(dto))
  }
}
