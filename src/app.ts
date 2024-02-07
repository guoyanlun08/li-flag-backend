import 'reflect-metadata';
import express from 'express';
import AppDataSource from './config/database';

import bodyParser from 'body-parser';

async function initProperties() {
  await AppDataSource.initialize()
  console.log('===== init =====');
}

async function bootstrap(){
  const app = express();

  app.use(bodyParser.json());
  
  app.listen(3000);
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