import { UserResponseDto } from "@/modules/user/dtos"
import { Exclude } from "class-transformer"

export class ProfileResponseDto extends UserResponseDto {
  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(user: UserResponseDto) {
    super(user)
  }
}
