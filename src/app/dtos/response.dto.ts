import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class ResponseDto<T> {
  public data: T

  @ApiProperty({ example: "ok" })
  public message: string

  @ApiProperty({ example: 200 })
  public status: HttpStatus

  constructor(data: T, message?: string, status?: HttpStatus) {
    this.data = data
    this.message = message || "ok"
    this.status = status || HttpStatus.OK
  }
}

export type AsyncResponseDto<T = any> = Promise<ResponseDto<T>>
