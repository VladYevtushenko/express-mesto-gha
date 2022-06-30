const { FORBIDDEN } = require('../utils/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.codeStatus = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
