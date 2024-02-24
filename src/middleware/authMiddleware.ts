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

function authMiddleware(req: Request, res: Response, next) {
  const modulePath = req.url.split('/')[2];
  const token = req.headers['authorization'];

  // 登录模块不需要。后续可能还会有跳过 token验证的接口
  if (modulePath === 'user') {
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
