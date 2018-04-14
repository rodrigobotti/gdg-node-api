const REGEX_NAME = /^[a-zA-Z]+$/

const baseUserSchema = {
  email: {
    in: 'body',
    notEmpty: true,
    isEmail: true
  },
  first_name: {
    in: 'body',
    notEmpty: true,
    matches: {
      options: [REGEX_NAME]
    }
  },
  last_name: {
    in: 'body',
    notEmpty: true,
    matches: {
      options: [REGEX_NAME]
    }
  },
  role: {
    in: 'body',
    notEmpty: true,
    matches: ['ADMIN', 'COMMON']
  },
  password: {
    in: 'body',
    notEmpty: true
  }
}

const paramIdSchema = {
  id: {
    in: 'params',
    notEmpty: true,
    isNumeric: true
  }
}

module.exports = {
  userCreate: baseUserSchema,
  userUpdate: { ...baseUserSchema, ...paramIdSchema },
  userRemove: paramIdSchema,
  authenticate: {
    email: {
      in: 'body',
      notEmpty: true,
      isEmail: true
    },
    password: {
      in: 'body',
      notEmpty: true
    }
  }
}
