import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { CategoryRequestDto, CategoryResponseDto } from "./dtos"
import { CategoryService } from "./category.service"

@ApiBearerAuth()
@ApiTags("category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() dto: CategoryRequestDto): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.create(dto))
  }

  @Get()
  async findAll(): AsyncResponseDto<CategoryResponseDto[]> {
    return new ResponseDto(await this.categoryService.findAll())
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.findOne(id))
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: CategoryRequestDto): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.update(id, dto))
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.remove(id))
  }
}
