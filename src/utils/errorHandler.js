class ErrorHandler extends Error {
  constructor(message, statusCode, path, keyValue, code) {
    super(message);
    this.statusCode = statusCode;
    this.path = path; // Optional field
    this.keyValue = keyValue; // Optional field
    this.code = code; // Optional field
  }
}

module.exports = ErrorHandler;
