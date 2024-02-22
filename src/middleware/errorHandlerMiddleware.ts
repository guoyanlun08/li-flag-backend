/**
 * 捕获错误处理中间件
 */
import responseHandler from '@/utils/response-handler';
import MyError from '@/common/my-error';

function errorHandlerMiddleware(error, req, res, next) {
  console.error(error);
  if (!(error instanceof MyError)) {
    error = new MyError(`系统错误:${error.message || error.stack}`);
  }

  const { status, msg } = error;
  return responseHandler({
    res,
    status,
    msg,
  });
}

export default errorHandlerMiddleware;
