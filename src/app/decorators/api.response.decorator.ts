import { applyDecorators, Type } from "@nestjs/common"
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger"
import { PaginationDto, ResponseDto } from "@/app/dtos"

export const ApiOkResponseData = <T extends Type<unknown>>(dto: T) =>
  applyDecorators(
    ApiExtraModels(ResponseDto, dto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: "object",
                $ref: getSchemaPath(dto)
              }
            }
          },
          { $ref: getSchemaPath(ResponseDto) }
        ]
      }
    })
  )

export const ApiOkResponsePagination = <T extends Type<unknown>>(dto: T) =>
  applyDecorators(
    ApiExtraModels(PaginationDto, dto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(dto) }
              }
            }
          },
          { $ref: getSchemaPath(PaginationDto) }
        ]
      }
    })
  )
