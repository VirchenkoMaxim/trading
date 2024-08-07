const { helpers, ApiError, enums } = require('../../shared')
const httpStatus = require('http-status')

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

  async getList({ userId, select }) {
    const user = await this._usersService.getOne({ _id: userId })

    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'user does not exist')

    /** it will be good to have filtration by ids to get just needed data */
    const results = await this._tradingSymbolsProvider.getList()

    return this._composeResult(await this._listSelectionDiscriminator[select](results, user))
  }

  _listSelectionDiscriminator = {
    [enums.tradingSymbols.listSelections.USER_FAVORITE]: this._getUserFavoriteList.bind(this),
    [enums.tradingSymbols.listSelections.ALL]: this._getAllList.bind(this),
  }

  async _getUserFavoriteList(results, user) {
    const serviceMap = helpers.arrayToMap(results, 'symbol')

    return user.tradingSymbolsIds.map((id) => serviceMap.get(id))
  }

  async _getAllList(results, user) {
    const serviceMap = helpers.arrayToMap(results, 'symbol')

    const userFavorite = user.tradingSymbolsIds.map((id) => {
      const item = serviceMap.get(id)
      serviceMap.delete(id)

      return { ...item, isInFavorite: true }
    })

    return [...userFavorite, ...Array.from(serviceMap.values())]
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
