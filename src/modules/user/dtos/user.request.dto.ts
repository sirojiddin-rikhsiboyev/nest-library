import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { PaginationOptionsDto } from "@/app/dtos"

export class UserRequestDto {
  @ApiProperty({ example: "John", description: "User name" })
  @IsNotEmpty()
  @IsString()
  public name: string

  @ApiProperty({ example: "Smith", description: "User surname" })
  @IsNotEmpty()
  @IsString()
  public surname: string

  @ApiProperty({ example: "user@email.com", description: "User email" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string

  @ApiProperty({ example: "12345678", description: "User password" })
  @IsOptional()
  @IsString()
  @Length(8)
  public password: string

  constructor(dto?: UserRequestDto) {
    if (dto) {
      this.name = dto.name
      this.surname = dto.surname
      this.email = dto.email
    }
  }
}

export class UserRequestFilterDto extends PaginationOptionsDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public email?: string
}
