const { helpers, ApiError } = require('../../shared')
const _ = require('lodash')
const httpStatus = require('http-status')
const UsersService = require('../users/users.service')

class TradingSymbolsService {
  /**
   * @param {TradingSymbolsProvider} tradingSymbolsProvider
   */
  constructor(tradingSymbolsProvider) {
    this._tradingSymbolsProvider = tradingSymbolsProvider
  }

  _onModuleInit(container) {
    /** @type {UsersService} */
    this._usersService = container.resolve('usersService')
  }

  _spread = 0.05

  async getList(query = {}) {
    if (_.isEmpty(query)) return this._composeResult(await this._tradingSymbolsProvider.getList())

    const user = await this._usersService.getOne({ _id: query.userId })

    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'user does not exist')

    /** it will be good to have filtration by ids to get just needed data */
    const result = await this._tradingSymbolsProvider.getList()

    const resultMap = new Map(result.map((item) => [item.symbol, item]))

    return this._composeResult(user.tradingSymbolsIds.map((id) => resultMap.get(id)))
  }

  _composeResult(data) {
    return data.map(({ price, ...item }) => ({
      ...item,
      price,
      ask: this._getAsk(+price, helpers.decimalCount(price)),
      bid: this._getBid(+price, helpers.decimalCount(price)),
    }))
  }

  _getAsk(price, decimalCount) {
    return helpers.toFixedString(price + this._getSpread(price), decimalCount)
  }

  _getBid(price, decimalCount) {
    return helpers.toFixedString(price - this._getSpread(price), decimalCount)
  }

  _getSpread(price) {
    return price * this._spread
  }

  async getOneById(id) {
    return this._tradingSymbolsProvider.getOneById(id)
  }
}

module.exports = TradingSymbolsService
