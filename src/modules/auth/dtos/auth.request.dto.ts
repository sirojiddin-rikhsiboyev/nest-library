import { UserRequestDto } from "@/modules/user/dtos"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegistrationRequestDto extends UserRequestDto {}

export class LoginRequestDto {
  @ApiProperty({ example: "sirojiddin.rikhsiboyev@gmail.com", description: "User email" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string

  @ApiProperty({ example: "12345678", description: "User password" })
  @IsNotEmpty()
  @IsString()
  public password: string
}
