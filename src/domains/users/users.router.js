const { httpMethods } = require('../../enum/http')
const { container } = require('../../di-container')
const schema = require('./users.schema')

/** @type {UsersController} */
const usersController = container.resolve('usersController')

module.exports = {
  basePath: '/users',
  [httpMethods.GET]: [
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
  [httpMethods.POST]: {
    url: '/',
    handler: usersController.createOne,
    schema: schema.createOne,
  },
  [httpMethods.PUT]: [
    {
      url: '/:id/toggle-trading-symbols',
      handler: usersController.toggleTradingSymbols,
      schema: schema.toggleTradingSymbols,
    },
  ],
}
