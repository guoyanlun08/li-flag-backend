/**
 * 返回统一处理
 */
import { HttpCode } from '@/common/http-code';

export default (config) => {
  const { res, status, data = [], msg = '', options = {} } = config;

  return res.status(status).json({
    data,
    msg,
    code: status === HttpCode.SUCCESS ? 0 : 1,
  });
};
