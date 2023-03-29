import { NestFactory, Reflector } from "@nestjs/core"
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common"
import { AppModule } from "./modules/app.module"
import { HttpExceptionFilter } from "@/app/filters"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(3000)
}

bootstrap()
