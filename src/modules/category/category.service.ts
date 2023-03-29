import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { ExceptionMessage } from "@/app/enums"
import { CategoryResponseDto, CategoryRequestDto } from "./dtos"
import { Category } from "./category.entity"

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(dto: CategoryRequestDto): Promise<CategoryResponseDto> {
    try {
      const instance = new CategoryRequestDto(dto)
      const category = this.categoryRepository.create(instance)
      return new CategoryResponseDto(await this.categoryRepository.save(category))
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.find()
    return categories.map((category) => new CategoryResponseDto(category))
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    try {
      const category = await this.categoryRepository.findOneByOrFail({ id })
      return new CategoryResponseDto(category)
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND)
    }
  }

  async update(id: number, dto: CategoryRequestDto): Promise<CategoryResponseDto> {
    try {
      const instance = new CategoryRequestDto(dto)
      await this.categoryRepository.update(id, instance)
      return await this.findOne(id)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      const category = await this.findOne(id)
      await this.categoryRepository.delete({ id })
      return new CategoryResponseDto(category)
    } catch (error) {
      throw error
    }
  }
}
