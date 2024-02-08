import 'reflect-metadata';
import express from 'express';
import AppDataSource from './config/database';

import bodyParser from 'body-parser';

async function initProperties() {
  await AppDataSource.initialize();
  console.log('===== init =====');
}

async function bootstrap() {
  const app = express();

  // jwt中间件
  // 图片处理中间件
  // 跨域中间件 ???
  app.use(bodyParser.json());

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
