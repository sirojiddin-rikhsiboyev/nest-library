import { ApiProperty } from "@nestjs/swagger"

export class UserResponseDto {
  @ApiProperty({ example: "1", description: "User id" })
  id: number

  @ApiProperty({ example: "John", description: "User name" })
  name: string

  @ApiProperty({ example: "Smith", description: "User surname" })
  surname: string

  @ApiProperty({ example: "user@email.com", description: "User email" })
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
