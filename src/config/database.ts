import { DataSource } from 'typeorm';

import { User } from '../entity/User';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'li-flag',
  synchronize: true, // 和数据库同步，推荐是说只能在开发环境用(后期处理)
  entities: [User],
});

export default AppDataSource;
