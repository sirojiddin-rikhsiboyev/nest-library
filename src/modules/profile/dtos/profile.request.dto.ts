import { IsNotEmpty, IsString, Length } from "class-validator"

export class ChangePasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(8)
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @Length(8)
  newPassword: string
}
