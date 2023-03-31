import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ApiOkResponseData, ApiOkResponsePagination } from "@/app/decorators"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { BookRequestDto, BookRequestFilterDto, BookResponseDto } from "./dtos"
import { BookService } from "./book.service"

@ApiBearerAuth()
@ApiTags("book-controller")
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: "Book create" })
  @ApiOkResponseData(BookResponseDto)
  @Post()
  async create(@Body() dto: BookRequestDto): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.create(dto))
  }

  @ApiOperation({ summary: "Book list" })
  @ApiOkResponsePagination(BookResponseDto)
  @Get()
  async findAll(@Query() options: BookRequestFilterDto): AsyncResponseDto<BookResponseDto[]> {
    return await this.bookService.findAll(options)
  }

  @ApiOperation({ summary: "Book find by id" })
  @ApiOkResponseData(BookResponseDto)
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.findOne(id))
  }

  @ApiOperation({ summary: "Book update" })
  @ApiOkResponseData(BookResponseDto)
  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: BookRequestDto): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.update(id, dto))
  }

  @ApiOperation({ summary: "Book remove" })
  @ApiOkResponseData(BookResponseDto)
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.remove(id))
  }
}
