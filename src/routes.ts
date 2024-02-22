import express, { Request, Response } from 'express';
import glob from 'glob';

import responseHandler from '@/utils/response-handler';
import { HttpCode } from '@/common/http-code';

const router = express.Router();
const controllers = glob.sync('src/modules/**/*-controller.ts');
const routeSet = new Set();

async function init(controllers) {
  const mods = await Promise.all(
    controllers.map((controller) => {
      const controllerDealPath = controller.replace(/^src\/|\.ts$/g, '');
      return import(`./${controllerDealPath}`);
    }),
  );

  mods.forEach((mod) => {
    addRouter(mod.default);
  });
}

function addRouter(Controller) {
  const controller = new Controller();

  const clsRouter = Reflect.getMetadata('Controller', Controller);
  const methods = Reflect.ownKeys(Controller.prototype);
  methods.forEach((method) => {
    const methodRouter = Reflect.getMetadata('Router', controller, String(method));

    if (methodRouter) {
      const path = `/api${clsRouter.path}${methodRouter.path}`;
      const routeInfo = `${methodRouter.method}: ${path}`;

      if (routeSet.has(routeInfo)) {
        console.warn(`【${path}】已经存在，请检查!`);
      }

      routeSet.add(routeInfo);
      console.debug(routeInfo);

      router[methodRouter.method](path, async (req: Request, res: Response, next) => {
        const methodName = `${clsRouter.name} -> ${Controller.name} :: ${String(method)}`;

        console.log(methodName); // 必要打印的 log
        try {
          const data = await controller[method](req, res);
          return responseHandler({
            res,
            data,
            status: HttpCode.SUCCESS,
            msg: '操作成功',
          });
        } catch (error) {
          next(error);
        }
      });
    }
  });
}

init(controllers);

export default router;
