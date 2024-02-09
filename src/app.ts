import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';

import router from './routes';
import AppDataSource from './config/database';

async function initProperties() {
  await AppDataSource.initialize();
}

async function bootstrap() {
  const app = express();

  // -----------------------------------
  // jwt中间件
  // 图片处理中间件
  // 跨域中间件 ???
  // 统一错误处理
  // -----------------------------------

  // 用来解析 post body x-www-form-urlencoded 格式数据
  app.use(bodyParser.urlencoded({ extended: false }));
  // 用来解析 post body json 格式数据
  app.use(bodyParser.json());
  app.use('/', router);


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
