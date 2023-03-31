import { BookResponseDto } from "@/modules/book/dtos"
import { ApiProperty } from "@nestjs/swagger"

export class FavoriteResponseDto {
  @ApiProperty({ example: "1", description: "Favorite id" })
  id: number

  @ApiProperty({ example: "1", description: "Book id" })
  bookId: number

  @ApiProperty({ example: "1", description: "User id" })
  userId: number

  createdAt: Date
  updatedAt: Date

  @ApiProperty({ type: BookResponseDto })
  books?: BookResponseDto[]

  constructor(dto: FavoriteResponseDto, books?: BookResponseDto[]) {
    this.id = dto.id
    this.bookId = dto.bookId
    this.userId = dto.userId
    this.createdAt = dto.createdAt
    this.updatedAt = dto.updatedAt
    this.books = books || []
  }
}
