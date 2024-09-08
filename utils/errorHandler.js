const { ResponseBuilder, StatusCode } = require('./response');
const { AppError, BadRequestError } = require('./errors');

function errorHandler(err, req, res, next) {
  console.error(err);

  // 设置默认状态码
  let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let stack = undefined;

  // 处理特定类型的错误
  if (err instanceof BadRequestError) {
    console.warn(`Bad Request: ${err.message}`);
    return res.status(err.statusCode).json(ResponseBuilder.badRequest(err.message));
  }

  if (err instanceof AppError) {
    console.error(`Application Error: ${err.message}`);
    return res.status(err.statusCode).json(ResponseBuilder.error(err.message, err.statusCode));
  }

  // 处理 Axios 错误 (后端API错误)
  if (err.isAxiosError) {
    statusCode = err.response?.status || StatusCode.INTERNAL_SERVER_ERROR;
    message = err.response?.data?.message || err.message;
    console.error(`API Error: ${message}`);
  }
  // 处理 404 错误
  if (statusCode === ResponseBuilder.notFound().code) {
    return res.status(statusCode.notFound).json(ResponseBuilder.notFound());
  }
  // 在开发环境中包含错误堆栈
  if (process.env.NODE_ENV === 'development') {
    stack = err.stack;
  }

  // 构建错误响应
  const errorResponse = ResponseBuilder.error(message, statusCode);
  
  // 如果在开发环境中，添加错误堆栈
  if (stack) {
    errorResponse.stack = stack;
  }

  // 返回 JSON 格式的错误信息
  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;