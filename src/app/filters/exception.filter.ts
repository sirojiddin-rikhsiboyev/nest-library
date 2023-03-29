import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common"
import { Response } from "express"
import { ResponseDto } from "../dtos"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    response
      .status(status)
      .json(
        new ResponseDto(
          null,
          (exception?.getResponse() as any)?.message || exception?.message || "internal_server_error",
          exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
        )
      )
  }
}
