# 前情

.vscode 文件夹里可设置是否保存自动格式化，大部分文件最好都格式化处理。 要使用【Prettier - Code formatter】插件为格式化默认配置，才能生效~

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

## TODO

| TODO 项 (完成项, 在这用~~删除线~~横划, 不要删掉.)                                             | 提出人 | 处理人 |
| --------------------------------------------------------------------------------------------- | ------ | ------ |
| ~~设置一下路径别名，'@/....'~~                                                                | allen  | allen  |
| feat: 接口返回需要封装一下，且定义一下数据格式。res.status().json(). 还有一些常量的定义工程化 | allen  | allen  |
