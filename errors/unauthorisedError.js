const { UNAUTHORIZED_ERROR } = require('../utils/errors');

class UnauthorisedError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.codeStatus = UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorisedError;
