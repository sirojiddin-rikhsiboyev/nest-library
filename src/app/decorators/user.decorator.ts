import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export interface ResponseUser {
  id: number
  email: string
}

export const User = createParamDecorator((key: keyof ResponseUser, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user: ResponseUser = request.user

  return key ? user?.[key] : user
})
