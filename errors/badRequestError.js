const { BAD_REQUEST } = require('../utils/errors');

class BadRequestError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.codeStatus = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
