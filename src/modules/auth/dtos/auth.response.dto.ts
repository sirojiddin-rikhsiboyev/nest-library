import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { UserResponseDto } from "@/modules/user/dtos"

export class RegistrationResponseDto extends UserResponseDto {
  @ApiProperty({ example: "Bearer ...", description: "User token" })
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
  @ApiProperty({ example: "Bearer ...", description: "User token" })
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
