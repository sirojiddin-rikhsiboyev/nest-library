import { UserResponseDto } from "@/modules/user/dtos"
import { Exclude } from "class-transformer"

export class RegistrationResponseDto extends UserResponseDto {
  token: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(user: UserResponseDto, token: string) {
    super(user)
    this.token = token
  }
}

export class LoginResponseDto extends UserResponseDto {
  token: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(user: UserResponseDto, token: string) {
    super(user)
    this.token = token
  }
}
