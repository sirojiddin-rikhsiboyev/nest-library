import { HttpStatus } from "@nestjs/common"
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator"
import { Type } from "class-transformer"
import { ResponseDto } from "./response.dto"
import { ApiProperty } from "@nestjs/swagger"

export enum Order {
  ASC = "ASC",
  DESC = "DESC"
}

export class PaginationOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  public order?: Order = Order.ASC

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  public page?: number = 1

  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  @Type(() => Number)
  public take?: number = 10

  get skip(): number {
    return (this.page - 1) * this.take
  }
}

export class PaginationMetaDto {
  @ApiProperty({ default: "1" })
  public page: number

  @ApiProperty({ default: "10" })
  public take: number

  @ApiProperty({ example: "11" })
  public itemCount: number

  @ApiProperty({ example: "2" })
  public pageCount: number

  @ApiProperty({ example: "false" })
  public hasPreviousPage: boolean

  @ApiProperty({ example: "true" })
  public hasNextPage: boolean

  constructor(options: PaginationOptionsDto, count: number) {
    this.page = options.page
    this.take = options.take
    this.itemCount = count
    this.pageCount = Math.ceil(this.itemCount / this.take)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}

export class PaginationDto<T> extends ResponseDto<T> {
  @ApiProperty()
  public meta: PaginationMetaDto

  constructor(data: T, meta: PaginationMetaDto, message?: string, status?: HttpStatus) {
    super(data, message, status)
    this.meta = meta
  }
}
