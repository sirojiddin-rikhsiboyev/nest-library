import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { compareSync, hashSync } from "bcryptjs"
import { ExceptionMessage } from "@/app/enums"
import { UserResponseDto } from "@/modules/user/dtos"
import { UserService } from "@/modules/user/user.service"
import { User } from "@/modules/user/user.entity"
import { ChangePasswordRequestDto, ProfileResponseDto } from "./dtos"

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UserService
  ) {}

  async profile(id: number): Promise<ProfileResponseDto> {
    return new ProfileResponseDto(await this.userService.findOne(id))
  }

  async changePassword(id: number, dto: ChangePasswordRequestDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id })
      if (!user) throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND)

      const password = compareSync(dto.oldPassword, user.password)
      if (!password || !dto.newPassword) throw new BadRequestException(ExceptionMessage.INCORRECT_PASSWORD)

      await this.userRepository.update(id, { password: hashSync(dto.newPassword, 10) })
      return new UserResponseDto(user)
    } catch (error) {
      throw error
    }
  }
}
