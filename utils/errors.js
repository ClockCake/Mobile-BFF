const { StatusCode } = require('./response'); 

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
      super(message, StatusCode.BAD_REQUEST);
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
      super(message, StatusCode.UNAUTHORIZED);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
      super(message, StatusCode.FORBIDDEN);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
      super(message, StatusCode.NOT_FOUND);
    }
  }
  
  module.exports = {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
  };