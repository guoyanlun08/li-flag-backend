// http 相关常量
export enum HttpCode {
  SUCCESS = 200,
  BAD_REQUEST = 400, // 请求参数格式不正确、缺少参数、参数超出范围等原因
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
