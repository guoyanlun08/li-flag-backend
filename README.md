# 前情

.vscode 要使用【Prettier - Code formatter】插件为格式化默认配置，才能生效~

## 启动

1. 先自行创建一个叫【li-flag】的 mysql 数据库.

2. npm install -g nodemon ts-node

3. npm i

4. npm start

## 依赖介绍

- typeORM: 操作数据库的 orm
- mysql2: 数据库驱动
- body-parser: 用来解析 request body 的内容
- cors: 解决跨域
- bcrypt: 密码加密和解密
- jsonwebtoken: 登录时生成 token 下发
- multer: 用于上传文件
