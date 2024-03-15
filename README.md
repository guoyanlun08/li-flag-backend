# 前情

要使用【Prettier - Code formatter】插件为格式化默认配置，才能生效~

## 启动

1. 先自行创建一个叫【li-flag】的 mysql 数据库.

2. npm install -g nodemon ts-node

3. npm i

4. npm start

## 规范

- mysql 里没有 boolean 类型，建议使用 tinyint 处理
- controller get 传参经处理传给 service；post 直接传 body

## 依赖介绍

- typeORM: 操作数据库的 orm
- mysql2: 数据库驱动
- cors: 解决跨域
- bcrypt: 密码加密和解密
- jsonwebtoken: 登录时生成 token 下发
- multer: 用于上传文件

## TODO

| TODO 项 (完成项, 在这用~~删除线~~横划, 不要删掉.)                                                 | 提出人 | 处理人 |
| ------------------------------------------------------------------------------------------------- | ------ | ------ |
| ~~设置一下路径别名，'@/....'~~                                                                    | allen  | allen  |
| ~~feat: 接口返回需要封装一下，且定义一下数据格式。res.status().json(). 还有一些常量的定义工程化~~ | allen  | allen  |
| 接口判断 userId，应该有通用的办法，查一下                                                         | allen  | allen  |
| 单例登录实现                                                                                      | allen  | allen  |
