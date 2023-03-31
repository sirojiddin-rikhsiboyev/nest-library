import { Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"
import { ApiOkResponseData, ApiOkResponsePagination, User } from "@/app/decorators"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { FavoriteResponseDto } from "@/modules/favorite/dtos"
import { BookRequestFilterDto, BookResponseDto } from "@/modules/book/dtos"
import { FavoriteService } from "./favorite.service"

@ApiBearerAuth()
@ApiTags("favorite-controller")
@Controller("favorite")
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: "Add favorite book" })
  @ApiOkResponseData(FavoriteResponseDto)
  @Post(":bookId")
  async create(@User("id") userId: number, @Param("bookId", ParseIntPipe) bookId: number): AsyncResponseDto<FavoriteResponseDto> {
    return new ResponseDto(await this.favoriteService.create(userId, bookId))
  }

  @ApiOperation({ summary: "Favorites list" })
  @ApiOkResponsePagination(BookResponseDto)
  @Get()
  async findAll(@User("id") userId: number, @Query() options: BookRequestFilterDto): AsyncResponseDto<BookResponseDto[]> {
    return await this.favoriteService.findAll(userId, options)
  }

  @ApiOperation({ summary: "Remove favorite book" })
  @ApiOkResponseData(FavoriteResponseDto)
  @Delete(":bookId")
  async remove(@Param("bookId", ParseIntPipe) id: number): AsyncResponseDto<FavoriteResponseDto> {
    return new ResponseDto(await this.favoriteService.remove(id))
  }
}
