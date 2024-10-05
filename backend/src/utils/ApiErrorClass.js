class ApiError extends Error {
  constructor(statusCode = 500, message = "Something went wrong", error = []) {
    super(message);
    this.status = statusCode;
    this.success = false;
    this.data = {};
    this.error = error;
  }
}

export default ApiError;
