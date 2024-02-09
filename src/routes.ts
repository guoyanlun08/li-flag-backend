import express, { Request, Response } from 'express';

import UserController from '@/modules/user/controller/user-controller';

const router = express.Router();

const userController = new UserController();

// todo: 这里将会有通用方法处理，临时先处理调调接口先
const userConMeta = Reflect.getMetadata('Controller', UserController);
const methods = Reflect.ownKeys(UserController.prototype);
methods.forEach((method) => {
  const userRouMeta = Reflect.getMetadata('Router', userController, String(method));

  if (userRouMeta) {
    // todo: 需要做个去重处理 Set()
    router[userRouMeta.method](`/api${userConMeta.path}${userRouMeta.path}`, async (req: Request, res: Response) => {
      const methodName = `${userConMeta.name} -> ${UserController.name} :: ${String(method)}`;

      console.log(methodName);
      const data = await userController[method](req, res);

      // todo: 统一处理返回！！
      return res.json({ data });
    });
  }
});

export default router;
