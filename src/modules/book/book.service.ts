import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOptionsWhere, Repository } from "typeorm"

import { Category } from "@/modules/category/category.entity"
import { ExceptionMessage } from "@/app/enums"
import { PaginationDto, PaginationMetaDto } from "@/app/dtos"
import { BookRequestDto, BookRequestFilterDto, BookResponseDto } from "./dtos"
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

      const category = await this.categoryRepository.findOneByOrFail({ id: instance.categoryId }).catch(() => {
        throw new NotFoundException(ExceptionMessage.CATEGORY_NOT_FOUND)
      })

      const book = this.bookRepository.create(instance)
      book.category = category

      return new BookResponseDto(await this.bookRepository.save(book))
    } catch (error) {
      throw error
    }
  }

  async findAll(options: BookRequestFilterDto): Promise<PaginationDto<BookResponseDto[]>> {
    const filters: FindOptionsWhere<Book> = { categoryId: options.categoryId }

    const books = await this.bookRepository.find({
      order: { id: options.order },
      skip: options.skip,
      take: options.take,
      relations: ["category"],
      where: filters
    })

    const count = await this.bookRepository.count({ where: filters })
    const meta = new PaginationMetaDto(options, count)

    return new PaginationDto(
      books.map((book) => new BookResponseDto(book)),
      meta
    )
  }

  async findOne(id: number): Promise<BookResponseDto> {
    try {
      const book = await this.bookRepository.findOneByOrFail({ id })
      return new BookResponseDto(book)
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.BOOK_NOT_FOUND)
    }
  }

  async update(id: number, dto: BookRequestDto): Promise<BookResponseDto> {
    try {
      const instance = new BookRequestDto(dto)

      if (dto.categoryId) {
        await this.categoryRepository.findOneByOrFail({ id: instance.categoryId }).catch(() => {
          throw new NotFoundException(ExceptionMessage.CATEGORY_NOT_FOUND)
        })
      }

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
