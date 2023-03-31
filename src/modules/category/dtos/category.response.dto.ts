import { ApiProperty } from "@nestjs/swagger"

export class CategoryResponseDto {
  @ApiProperty({ example: "1", description: "Category id" })
  public id: number

  @ApiProperty({ example: "Category", description: "Category name" })
  public name: string

  @ApiProperty({ example: "Description", description: "Category description" })
  public description: string

  public createdAt: Date
  public updatedAt: Date

  constructor(dto: CategoryResponseDto) {
    this.id = dto.id
    this.name = dto.name
    this.description = dto.description
    this.createdAt = dto.createdAt
    this.updatedAt = dto.updatedAt
  }
}
