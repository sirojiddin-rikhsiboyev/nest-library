export class BookResponseDto {
  public id: number
  public categoryId: number
  public name: string
  public description: string
  public author: string
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
