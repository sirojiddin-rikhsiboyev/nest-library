export class CategoryResponseDto {
  public id: number
  public name: string
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
