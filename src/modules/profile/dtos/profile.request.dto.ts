import { IsNotEmpty, IsString, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class ChangePasswordRequestDto {
  @ApiProperty({ example: "12345678", description: "Old password" })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  oldPassword: string

  @ApiProperty({ example: "87654321", description: "New password" })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  newPassword: string
}
