import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CategoryRequestDto {
  @ApiProperty({ example: "Category", description: "Category name" })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ example: "Description", description: "Category description" })
  @IsOptional()
  @IsString()
  readonly description: string

  constructor(dto?: CategoryRequestDto) {
    if (dto) {
      this.name = dto.name
      this.description = dto.description
    }
  }
}
