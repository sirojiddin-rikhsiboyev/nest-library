import { CategoryResponseDto } from "@/modules/category/dtos"

export class BookResponseDto {
  public id: number
  public name: string
  public description: string
  public author: string
  public year: number
  public createdAt: Date
  public updatedAt: Date
  public category: CategoryResponseDto

  constructor(dto: BookResponseDto) {
    this.id = dto.id
    this.name = dto.name
    this.description = dto.description
    this.author = dto.author
    this.year = dto.year
    this.createdAt = dto.createdAt
    this.updatedAt = dto.updatedAt
    this.category = new CategoryResponseDto(dto.category)
  }
}
