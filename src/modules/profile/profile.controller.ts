import { Body, Controller, Get, Put } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger"

import { ApiOkResponseData, User } from "@/app/decorators"
import { AsyncResponseDto, ResponseDto } from "@/app/dtos"
import { UserResponseDto } from "@/modules/user/dtos"
import { ProfileService } from "./profile.service"
import { ChangePasswordRequestDto } from "./dtos"

@ApiBearerAuth()
@ApiTags("profile-controller")
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: "Profile get" })
  @ApiOkResponseData(UserResponseDto)
  @Get()
  async profile(@User("id") userId): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.profileService.profile(userId))
  }

  @ApiOperation({ summary: "Change password" })
  @ApiOkResponseData(UserResponseDto)
  @Put("change-password")
  async changePassword(@User("id") userId, @Body() dto: ChangePasswordRequestDto): AsyncResponseDto<UserResponseDto> {
    return new ResponseDto(await this.profileService.changePassword(userId, dto))
  }
}
