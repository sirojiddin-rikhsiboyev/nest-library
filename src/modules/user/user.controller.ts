import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common"

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { UserRequestDto, UserRequestFilterDto, UserResponseDto } from "./dtos"
import { UserService } from "./user.service"

@ApiBearerAuth()
@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: UserRequestDto): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.create(dto))
  }

  @Get()
  async findAll(@Query() options: UserRequestFilterDto): AsyncResponseDto<UserResponseDto[]> {
    return await this.userService.findAll(options)
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.findOne(id))
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UserRequestDto): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.update(id, dto))
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.userService.remove(id))
  }
}
