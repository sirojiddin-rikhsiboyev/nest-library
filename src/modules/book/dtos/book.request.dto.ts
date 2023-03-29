import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BookRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly description: string

  @IsNotEmpty()
  @IsString()
  readonly author: string

  @IsNotEmpty()
  @IsNumber()
  readonly year: number

  constructor(dto?: BookRequestDto) {
    if (dto) {
      this.name = dto.name
      this.description = dto.description
      this.author = dto.author
      this.year = dto.year
    }
  }
}
