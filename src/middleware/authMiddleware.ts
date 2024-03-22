/**
 * 权限校验中间件
 */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HttpCode } from '@/common/http-code';
import MyError from '@/common/my-error';

export type CallerInfo = {
  userId: string;
};
// 可以忽略 token校验的接口
const whiteUrl = ['/api/user/login', '/api/user/register'];

function authMiddleware(req: Request, res: Response, next) {
  const token = req.headers['authorization'];
  console.log(req.url);

  // 登录模块不需要。后续可能还会有跳过 token验证的接口
  if (whiteUrl.some((url) => url === req.url)) {
    return next();
  }

  if (!token) {
    throw new MyError('没有传递token', HttpCode.UNAUTHORIZED);
  }

  jwt.verify(token, 'login-token-key', (err, caller: CallerInfo) => {
    if (err) {
      throw new MyError('非法token', HttpCode.FORBIDDEN);
    }

    res.locals.caller = caller;
    next();
  });
}

export default authMiddleware;
