const { enums } = require('../../shared')
const { container } = require('../../di-container')
const schema = require('./users.schema')

/** @type {UsersController} */
const usersController = container.resolve('usersController')

module.exports = {
  basePath: '/users',
  [enums.http.methods.GET]: [
    {
      url: '/',
      handler: usersController.getList,
      schema: schema.getList,
    },
    {
      url: '/one',
      handler: usersController.getOneByFilter,
      schema: schema.getOneByFilter,
    },
    {
      url: '/:id',
      handler: usersController.getOne,
      schema: schema.getOne,
    },
  ],
  [enums.http.methods.POST]: {
    url: '/',
    handler: usersController.createOne,
    schema: schema.createOne,
  },
  [enums.http.methods.PUT]: [
    {
      url: '/:id/toggle-trading-symbols',
      handler: usersController.toggleTradingSymbols,
      schema: schema.toggleTradingSymbols,
    },
  ],
}
