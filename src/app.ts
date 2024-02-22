import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import AppDataSource from './config/database';
import authMiddleware from '@/middleware/authMiddleware';
import errorHandlerMiddleware from '@/middleware/errorHandlerMiddleware';

import router from './routes';

async function initProperties() {
  await AppDataSource.initialize();
}

async function bootstrap() {
  const app = express();

  // -----------------------------------
  // 图片处理中间件
  // -----------------------------------

  // 用来解析 post body json 格式数据
  app.use(express.json());
  // 用来解析 post body x-www-form-urlencoded 格式数据
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  // app.use(authMiddleware);

  app.use('/', router);
  app.use(errorHandlerMiddleware);

  app.listen(3020);
}

const appBoot = async () => {
  try {
    console.info('=====  应用启动中.... =====');
    await initProperties();
    await bootstrap();

    console.info('=====  应用启动完毕.... =====');
  } catch (ex) {
    console.warn('===== 应用配置初始化失败 =====', ex);
  }
};

void appBoot(); // 执行启动
