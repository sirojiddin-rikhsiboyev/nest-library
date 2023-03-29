import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { ExceptionMessage } from "@/app/enums"
import { Category } from "@/modules/category/category.entity"
import { BookRequestDto, BookResponseDto } from "./dtos"
import { Book } from "./book.entity"

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(dto: BookRequestDto): Promise<BookResponseDto> {
    try {
      const instance = new BookRequestDto(dto)

      const category = await this.categoryRepository.findOneByOrFail({ id: instance.categoryId })

      const book = this.bookRepository.create(instance)
      book.category = category

      return new BookResponseDto(await this.bookRepository.save(book))
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({ relations: ["category"] })
    return books.map((book) => new BookResponseDto(book))
  }

  async findOne(id: number): Promise<BookResponseDto> {
    try {
      const book = await this.bookRepository.findOneByOrFail({ id })
      return new BookResponseDto(book)
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND)
    }
  }

  async update(id: number, dto: BookRequestDto): Promise<BookResponseDto> {
    try {
      const instance = new BookRequestDto(dto)
      await this.bookRepository.update(id, instance)
      return await this.findOne(id)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      const book = await this.findOne(id)
      await this.bookRepository.delete({ id })
      return new BookResponseDto(book)
    } catch (error) {
      throw error
    }
  }
}
