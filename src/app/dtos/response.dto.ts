import { HttpStatus } from "@nestjs/common"

export class ResponseDto<T> {
  public data: T
  public message: string
  public status: HttpStatus

  constructor(data: T, message?: string, status?: HttpStatus) {
    this.data = data
    this.message = message || "ok"
    this.status = status || HttpStatus.OK
  }
}

export type AsyncResponseDto<T = any> = Promise<ResponseDto<T>>
