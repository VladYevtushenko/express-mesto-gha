const { CONFLICT } = require('../utils/errors');

class ConflictError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.codeStatus = CONFLICT;
  }
}

module.exports = ConflictError;
