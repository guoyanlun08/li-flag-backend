/**
 * 错误对象处理
 * 项目中报错，用 new myError
 */
import { HttpCode } from './http-code';

class MyError extends Error {
  public status: number;

  public msg: string;

  public data?: any;

  constructor(msg?: string, status?: number, data?: any) {
    super(msg);

    this.msg = msg || '系统异常';
    this.status = status || HttpCode.SERVER_ERROR;
    this.data = data || undefined;
  }
}

export default MyError;
