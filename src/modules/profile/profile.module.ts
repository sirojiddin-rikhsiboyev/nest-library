import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "@/modules/user/user.module"
import { User } from "@/modules/user/user.entity"
import { ProfileService } from "./profile.service"
import { ProfileController } from "./profile.controller"

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
