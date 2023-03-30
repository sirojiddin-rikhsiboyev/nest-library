import { NestFactory, Reflector } from "@nestjs/core"
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common"
import { AppModule } from "./modules/app.module"
import { HttpExceptionFilter } from "@/app/filters"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder().setTitle("Library REST API").setVersion("1.0").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(3000)
}

bootstrap()
