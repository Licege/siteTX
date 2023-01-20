import { createParamDecorator } from '@nestjs/common';

export const SessionUser = createParamDecorator((_data: unknown, ctx) => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
