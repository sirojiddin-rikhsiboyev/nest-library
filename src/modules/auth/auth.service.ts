import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compareSync } from "bcryptjs"

import { ExceptionMessage } from "@/app/enums"
import { UserResponseDto } from "@/modules/user/dtos"
import { UserService } from "@/modules/user/user.service"
import { LoginRequestDto, LoginResponseDto, RegistrationRequestDto, RegistrationResponseDto } from "./dtos"

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async registration(dto: RegistrationRequestDto): Promise<RegistrationResponseDto> {
    const user = await this.userService.create(dto)
    return new RegistrationResponseDto(user, await this.generateToken(user))
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userService.findByEmail(dto.email)
      if (!user) throw new UnauthorizedException(ExceptionMessage.USER_NOT_FOUND)

      const password = compareSync(dto.password, user.password)
      if (!password) throw new UnauthorizedException(ExceptionMessage.INCORRECT_PASSWORD)

      return new LoginResponseDto(user, await this.generateToken(user))
    } catch (error) {
      throw error
    }
  }

  async generateToken(user: UserResponseDto): Promise<string> {
    const { id, email } = user
    return this.jwtService.sign({ id, email })
  }
}
