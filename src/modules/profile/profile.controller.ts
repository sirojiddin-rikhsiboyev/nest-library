import { Body, Controller, Get, Put } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

import { User } from "@/app/decorators"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { UserResponseDto } from "@/modules/user/dtos"
import { ProfileService } from "./profile.service"
import { ChangePasswordRequestDto } from "./dtos"

@ApiBearerAuth()
@ApiTags("profile")
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async profile(@User("id") userId): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.profileService.profile(userId))
  }

  @Put("change-password")
  async changePassword(@User("id") userId, @Body() dto: ChangePasswordRequestDto): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.profileService.changePassword(userId, dto))
  }
}
