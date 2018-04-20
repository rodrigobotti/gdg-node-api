/**
 * Error code catalogue
 *
 * @module utils/error
 * @name catalogue
 */
const catalogue = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_REQUEST: 'INVALID_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL: 'INTERNAL'
}

/**
 * Error code-to-response map.
 * Maps an error code to an http response.
 *
 * @module utils/error
 * @name response
 */
const response = {
  [catalogue.UNAUTHENTICATED]: {
    status: 401,
    body: { message: 'User not authenticated' }
  },
  [catalogue.INVALID_CREDENTIALS]: {
    status: 401,
    body: { message: 'Invalid credentials' }
  },
  [catalogue.FORBIDDEN]: {
    status: 403,
    body: { message: 'Unauthorized access to resource' }
  },
  [catalogue.INVALID_REQUEST]: {
    status: 400,
    body: { message: 'Invalid request parameters' }
  },
  [catalogue.NOT_FOUND]: {
    status: 404,
    body: { message: 'Resource not found' }
  },
  [catalogue.INTERNAL]: {
    status: 500,
    body: { message: 'Internal server error' }
  }
}

/**
 * Custom error class representing a managed error i.e. the result of capturing a runtime error and handling it.
 *
 * @module utils/error
 * @name ManagedError
 * @class
 */
class ManagedError extends Error {
  /**
   * @constructor
   * @param {string} code error code
   * @param {string} message error message
   * @see {@link utils/error:catalogue}
   */
  constructor (code, message = '') {
    super(message || code)
    this._code = code
  }
  get code () {
    return this._code
  }
}

module.exports = {
  catalogue,
  response,
  ManagedError
}
