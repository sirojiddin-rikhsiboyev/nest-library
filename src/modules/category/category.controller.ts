import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ApiOkResponseData, ApiOkResponsePagination } from "@/app/decorators"
import { AsyncResponseDto, PaginationOptionsDto, ResponseDto } from "@/app/dtos"
import { CategoryRequestDto, CategoryResponseDto } from "./dtos"
import { CategoryService } from "./category.service"

@ApiBearerAuth()
@ApiTags("category-controller")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Category create" })
  @ApiOkResponseData(CategoryResponseDto)
  @Post()
  async create(@Body() dto: CategoryRequestDto): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.create(dto))
  }

  @ApiOperation({ summary: "Category list" })
  @ApiOkResponsePagination(CategoryResponseDto)
  @Get()
  async findAll(@Query() options: PaginationOptionsDto): AsyncResponseDto<CategoryResponseDto[]> {
    return await this.categoryService.findAll(options)
  }

  @ApiOperation({ summary: "Category find by id" })
  @ApiOkResponseData(CategoryResponseDto)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.findOne(id))
  }

  @ApiOperation({ summary: "Category update" })
  @ApiOkResponseData(CategoryResponseDto)
  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: CategoryRequestDto): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.update(id, dto))
  }

  @ApiOperation({ summary: "Category remove" })
  @ApiOkResponseData(CategoryResponseDto)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<CategoryResponseDto> {
    return new ResponseDto(await this.categoryService.remove(id))
  }
}
