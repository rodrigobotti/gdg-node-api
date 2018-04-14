const catalogue = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_REQUEST: 'INVALID_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL: 'INTERNAL'
}

const response = {
  [catalogue.UNAUTHENTICATED]: {
    status: 401,
    body: { message: 'User not authenticated' }
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

class ManagedError extends Error {
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
