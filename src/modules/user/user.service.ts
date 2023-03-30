import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOptionsWhere, ILike, Repository } from "typeorm"
import { hashSync } from "bcryptjs"

import { PaginationDto, PaginationMetaDto } from "@/app/dtos"
import { ExceptionMessage } from "@/app/enums"

import { UserRequestDto, UserRequestFilterDto, UserResponseDto } from "./dtos"
import { User } from "./user.entity"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(dto: UserRequestDto): Promise<UserResponseDto> {
    try {
      const instance = new UserRequestDto(dto)

      const candidate = await this.findByEmail(instance.email)
      if (candidate) throw new BadRequestException(ExceptionMessage.USER_EMAIL_EXISTS)

      instance.password = hashSync(dto.password, 10)
      const user = this.userRepository.create(instance)
      return new UserResponseDto(await this.userRepository.save(user))
    } catch (error) {
      throw error
    }
  }

  async findAll(options: UserRequestFilterDto): Promise<PaginationDto<UserResponseDto[]>> {
    const filters: FindOptionsWhere<User> = { email: options.email ? ILike(`%${options.email}%`) : undefined }

    const users = await this.userRepository.find({
      order: { id: options.order },
      skip: options.skip,
      take: options.take,
      where: filters
    })

    const count = await this.userRepository.count({ where: filters })
    const meta = new PaginationMetaDto(options, count)

    return new PaginationDto(
      users.map((user) => new UserResponseDto(user)),
      meta
    )
  }

  async findOne(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id })
      return new UserResponseDto(user)
    } catch (error) {
      throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND)
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email })
  }

  async update(id: number, dto: UserRequestDto): Promise<UserResponseDto> {
    try {
      const instance = new UserRequestDto(dto)
      await this.userRepository.update(id, instance)
      return await this.findOne(id)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number): Promise<UserResponseDto> {
    try {
      const user = await this.findOne(id)
      await this.userRepository.delete({ id })
      return new UserResponseDto(user)
    } catch (error) {
      throw error
    }
  }
}
