import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer"
import { PaginationOptionsDto } from "@/app/dtos"

export class BookRequestDto {
  @ApiProperty({ example: "Book", description: "Book name" })
  @IsNotEmpty()
  @IsString()
  public name: string

  @ApiProperty({ example: "Description", description: "Book description" })
  @IsNotEmpty()
  @IsString()
  public description: string

  @ApiProperty({ example: "Author", description: "Book author" })
  @IsNotEmpty()
  @IsString()
  public author: string

  @ApiProperty({ example: "2002", description: "Book year" })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  public year: number

  @ApiProperty({ example: "1", description: "Book category id" })
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
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public categoryId?: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public name?: string
}
