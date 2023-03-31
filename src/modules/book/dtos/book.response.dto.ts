import { ApiProperty } from "@nestjs/swagger"

export class BookResponseDto {
  @ApiProperty({ example: "1", description: "Book id" })
  public id: number

  @ApiProperty({ example: "1", description: "Category id" })
  public categoryId: number

  @ApiProperty({ example: "Book", description: "Book name" })
  public name: string

  @ApiProperty({ example: "Description", description: "Book description" })
  public description: string

  @ApiProperty({ example: "Author", description: "Book author" })
  public author: string

  @ApiProperty({ example: "2002", description: "Book year" })
  public year: number

  public createdAt: Date
  public updatedAt: Date

  constructor(dto: BookResponseDto) {
    this.id = dto.id
    this.categoryId = dto.categoryId
    this.name = dto.name
    this.description = dto.description
    this.author = dto.author
    this.year = dto.year
    this.createdAt = dto.createdAt
    this.updatedAt = dto.updatedAt
  }
}
