import { BookResponseDto } from "@/modules/book/dtos"

export class FavoriteResponseDto {
  id: number
  bookId: number
  userId: number
  createdAt: Date
  updatedAt: Date
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
