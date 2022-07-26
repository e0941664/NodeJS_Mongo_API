class ErrorResponse extends Error {
  constructor(statusCode, success, error) {
    super(error);
    this.success = success;
    this.statusCode = statusCode;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
