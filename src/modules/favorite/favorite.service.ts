import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOptionsWhere, ILike, Repository } from "typeorm"
import { ExceptionMessage } from "@/app/enums"
import { PaginationDto, PaginationMetaDto } from "@/app/dtos"
import { BookRequestFilterDto, BookResponseDto } from "@/modules/book/dtos"
import { Book } from "@/modules/book/book.entity"
import { User } from "@/modules/user/user.entity"
import { Favorite } from "./favorite.entity"
import { FavoriteResponseDto } from "./dtos"

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(userId: number, bookId: number): Promise<FavoriteResponseDto> {
    try {
      const book = await this.bookRepository.findOneBy({ id: bookId })
      if (!book) throw new NotFoundException(ExceptionMessage.BOOK_NOT_FOUND)

      const user = await this.userRepository.findOneBy({ id: userId })
      if (!user) throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND)

      const favorite = this.favoriteRepository.create({ bookId, userId })
      return new FavoriteResponseDto(await this.favoriteRepository.save(favorite), [new BookResponseDto(book)])
    } catch (error) {
      throw error
    }
  }

  async findAll(userId: number, options: BookRequestFilterDto): Promise<PaginationDto<BookResponseDto[]>> {
    const filters: FindOptionsWhere<Favorite> = {
      userId,
      book: { categoryId: options.categoryId, name: options.name ? ILike(`%${options.name}%`) : undefined }
    }

    const favorites = await this.favoriteRepository.find({
      order: { id: options.order },
      skip: options.skip,
      take: options.take,
      relations: ["book"],
      where: filters
    })

    const count = await this.favoriteRepository.count({ where: filters })
    const meta = new PaginationMetaDto(options, count)

    return new PaginationDto(
      favorites.map((favorite) => new BookResponseDto(favorite.book)),
      meta
    )
  }

  async findOne(bookId: number): Promise<FavoriteResponseDto> {
    try {
      const favorite = await this.favoriteRepository.findOneOrFail({ where: { bookId }, relations: ["book"] })
      return new FavoriteResponseDto(favorite, [new BookResponseDto(favorite.book)])
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.BOOK_NOT_FOUND)
    }
  }

  async remove(bookId: number) {
    try {
      const favorite = await this.findOne(bookId)
      await this.favoriteRepository.delete({ bookId })
      return favorite
    } catch (error) {
      throw error
    }
  }
}
