const validation = require('./users.validation')

const tag = 'users'

exports.getOne = Object.assign(
  {
    tags: [tag],
    description: 'get one user by id',
  },
  validation.getOne
)

exports.getOneByFilter = Object.assign({
  tags: [tag],
  description: 'get one user by filter',
})

exports.getList = Object.assign({
  tags: [tag],
  description: 'get users',
})

exports.createOne = Object.assign(
  {
    tags: [tag],
    description: 'create one user',
  },
  validation.createOne
)

exports.toggleTradingSymbols = Object.assign(
  {
    tags: [tag],
    description: 'toggle user trading symbols',
  },
  validation.toggleTradingSymbols
)
