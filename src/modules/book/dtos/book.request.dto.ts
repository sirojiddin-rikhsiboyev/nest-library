import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer"
import { PaginationOptionsDto } from "@/app/dtos"

export class BookRequestDto {
  @IsNotEmpty()
  @IsString()
  public name: string

  @IsNotEmpty()
  @IsString()
  public description: string

  @IsNotEmpty()
  @IsString()
  public author: string

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  public year: number

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  public categoryId: number

  constructor(dto?: BookRequestDto) {
    if (dto) {
      this.name = dto.name
      this.description = dto.description
      this.author = dto.author
      this.year = dto.year
      this.categoryId = dto.categoryId
    }
  }
}

export class BookRequestFilterDto extends PaginationOptionsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public categoryId?: number
}
