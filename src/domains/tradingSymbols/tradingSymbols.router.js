const { httpMethods } = require('../../enum/http')
const { container } = require('../../di-container')
const schema = require('./tradingSymbols.schema')

const tradingSymbolsController = container.resolve('tradingSymbolsController')

module.exports = {
  basePath: '/trading-symbols',
  [httpMethods.GET]: [
    {
      url: '/',
      handler: tradingSymbolsController.getList,
      schema: schema.getList,
    },
  ],
}
