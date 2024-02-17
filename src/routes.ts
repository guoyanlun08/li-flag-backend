import express, { Request, Response } from 'express';
import glob from 'glob';

const router = express.Router();
const controllers = glob.sync('src/modules/**/*-controller.ts');

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
      // todo: 需要做个去重处理 Set()`
      router[methodRouter.method](`/api${clsRouter.path}${methodRouter.path}`, async (req: Request, res: Response) => {
        const methodName = `${clsRouter.name} -> ${Controller.name} :: ${String(method)}`;

        console.log(methodName); // 必要打印的 log

        // 这里返回码常量定义, 错误处理应该还需要处理一下
        // 成功返回应该也会有 msg
        try {
          const data = await controller[method](req, res);
          return res.status(200).json({ code: 1, data });
        } catch (error) {
          return res.status(500).json({ code: 0, msg: error.message });
        }
      });
    }
  });
}

init(controllers);

export default router;
