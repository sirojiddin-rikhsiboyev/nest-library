import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common"

import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { BookRequestDto, BookResponseDto } from "./dtos"
import { BookService } from "./book.service"

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() dto: BookRequestDto): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.create(dto))
  }

  @Get()
  async findAll(): AsyncResponseDto<BookResponseDto[]> {
    return new ResponseDto(await this.bookService.findAll())
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.findOne(id))
  }

  @Put(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: BookRequestDto): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.update(id, dto))
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): AsyncResponseDto<BookResponseDto> {
    return new ResponseDto(await this.bookService.remove(id))
  }
}
