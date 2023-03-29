import { Injectable } from "@nestjs/common"
import { RegistrationRequestDto } from "./dtos"
import { UserService } from "@/modules/user/user.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async registration(dto: RegistrationRequestDto) {}

  create(createAuthDto: any) {
    return "This action adds a new auth"
  }

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
