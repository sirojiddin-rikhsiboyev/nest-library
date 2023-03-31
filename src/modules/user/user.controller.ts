import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common"

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ApiOkResponseData, ApiOkResponsePagination } from "@/app/decorators"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { UserRequestDto, UserRequestFilterDto, UserResponseDto } from "./dtos"
import { UserService } from "./user.service"

@ApiBearerAuth()
@ApiTags("user-controller")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "User create" })
  @ApiOkResponseData(UserResponseDto)
  @Post()
  async create(@Body() dto: UserRequestDto): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.create(dto))
  }

  @ApiOperation({ summary: "User list" })
  @ApiOkResponsePagination(UserResponseDto)
  @Get()
  async findAll(@Query() options: UserRequestFilterDto): AsyncResponseDto<UserResponseDto[]> {
    return await this.userService.findAll(options)
  }

  @ApiOperation({ summary: "User find by id" })
  @ApiOkResponseData(UserResponseDto)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.findOne(id))
  }

  @ApiOperation({ summary: "User update" })
  @ApiOkResponseData(UserResponseDto)
  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UserRequestDto): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.update(id, dto))
  }

  @ApiOperation({ summary: "User remove" })
  @ApiOkResponseData(UserResponseDto)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.remove(id))
  }
}
