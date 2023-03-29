import { UserRequestDto } from "@/modules/user/dtos"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegistrationRequestDto extends UserRequestDto {}

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string

  @IsNotEmpty()
  @IsString()
  public password: string
}
