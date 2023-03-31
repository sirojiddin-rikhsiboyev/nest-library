import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { ApiOkResponseData, Public } from "@/app/decorators"
import { LoginRequestDto, LoginResponseDto, RegistrationRequestDto, RegistrationResponseDto } from "./dtos"
import { AuthService } from "./auth.service"

@ApiTags("auth-controller")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Registration" })
  @ApiOkResponseData(RegistrationResponseDto)
  @Public()
  @Post("registration")
  @HttpCode(HttpStatus.OK)
  async registration(@Body() dto: RegistrationRequestDto): AsyncResponseDto<RegistrationResponseDto> {
    return new ResponseDto(await this.authService.registration(dto))
  }

  @ApiOperation({ summary: "Login" })
  @ApiOkResponseData(LoginResponseDto)
  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginRequestDto): AsyncResponseDto<LoginResponseDto> {
    return new ResponseDto(await this.authService.login(dto))
  }
}
