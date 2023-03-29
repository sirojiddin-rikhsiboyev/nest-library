import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PaginationOptionsDto } from "@/app/dtos"

export class UserRequestDto {
  @IsNotEmpty()
  @IsString()
  public name: string

  @IsNotEmpty()
  @IsString()
  public surname: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string

  @IsOptional()
  @IsString()
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
  @IsString()
  @IsOptional()
  public email?: string
}
