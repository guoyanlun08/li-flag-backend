import express, { Request, Response } from 'express';

import UserController from '@/modules/user/controller/user-controller';

const router = express.Router();

// todo: 会有个遍历处理，先临时调用先
const userController = new UserController();

const userConMeta = Reflect.getMetadata('Controller', UserController);
const methods = Reflect.ownKeys(UserController.prototype);
methods.forEach((method) => {
  const userRouMeta = Reflect.getMetadata('Router', userController, String(method));

  if (userRouMeta) {
    // todo: 需要做个去重处理 Set()
    router[userRouMeta.method](`/api${userConMeta.path}${userRouMeta.path}`, async (req: Request, res: Response) => {
      const methodName = `${userConMeta.name} -> ${UserController.name} :: ${String(method)}`;

      console.log(methodName); // 必要打印的 log

      // 这里返回码常量定义, 错误处理应该还需要处理一下
      // 成功返回应该也会有 msg
      try {
        const data = await userController[method](req, res);
        return res.status(200).json({ code: 1, data });
      } catch (error) {
        return res.status(500).json({ code: 0, msg: error.message });
      }
    });
  }
});

export default router;
