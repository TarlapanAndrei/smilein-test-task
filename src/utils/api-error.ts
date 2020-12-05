class ErrorExemple {
  code: number;
  message: string;
}

class ApiError extends ErrorExemple {
  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
  static badRequest(msg: string): ApiError {
    return new ApiError(400, msg);
  }
}
export default ApiError;