import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CategoryRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsOptional()
  @IsString()
  readonly description: string

  constructor(dto?: CategoryRequestDto) {
    if (dto) {
      this.name = dto.name
      this.description = dto.description
    }
  }
}
