const { UNAUTHORIZED_ERROR } = require('../utils/errors');

class UnauthorisedError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorisedError;
