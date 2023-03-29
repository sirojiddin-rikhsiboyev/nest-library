import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { RegistrationRequestDto } from "./dtos"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  registration(@Body() dto: RegistrationRequestDto) {
    return this.authService.create(dto)
  }

  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthDto: any) {
    return this.authService.update(+id, updateAuthDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id)
  }
}
