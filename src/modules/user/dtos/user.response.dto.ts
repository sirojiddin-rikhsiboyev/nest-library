export class UserResponseDto {
  id: number
  name: string
  surname: string
  email: string
  createdAt: Date | string
  updatedAt: Date | string

  constructor(dto: UserResponseDto) {
    this.id = dto.id
    this.name = dto.name
    this.surname = dto.surname
    this.email = dto.email
    this.createdAt = dto.createdAt
    this.updatedAt = dto.updatedAt
  }
}
