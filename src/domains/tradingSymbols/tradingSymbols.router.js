const { enums } = require('../../shared')
const { container } = require('../../di-container')
const schema = require('./tradingSymbols.schema')

const tradingSymbolsController = container.resolve('tradingSymbolsController')

module.exports = {
  basePath: '/trading-symbols',
  [enums.http.methods.GET]: [
    {
      url: '/',
      handler: tradingSymbolsController.getList,
      schema: schema.getList,
    },
  ],
}
