import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next) {
  const modulePath = req.url.split('/')[2];
  const token = req.headers['authorization'];

  // 登录模块不需要。后续可能还会有跳过 token验证的接口
  if (modulePath === 'user') {
    next();
    return;
  }

  if (!token) {
    res.status(401).json({ error: '没有传递token' });
  }

  jwt.verify(token, 'login-token-key', (err, user) => {
    if (err) {
      res.status(403).json({ error: '非法token' });
    }

    res.locals.user = user;
    next();
  });
}

export default authMiddleware;
