const autoBind = require('auto-bind')
const httpStatus = require('http-status')

class TradingSymbolsController {
  /**
   * @param {TradingSymbolsService} tradingSymbolsService
   */
  constructor(tradingSymbolsService) {
    autoBind(this)
    this._tradingSymbolsService = tradingSymbolsService
  }

  async getList({ query }) {
    const result = await this._tradingSymbolsService.getList(query)

    return { statusCode: httpStatus.OK, result }
  }
}

module.exports = TradingSymbolsController
