const { enums, ApiError } = require('../../shared')
const httpStatus = require('http-status')

class UsersService {
  /**
   *
   * @param {UsersRepository} usersRepository
   * @param {TradingSymbolsService} tradingSymbolsService
   */
  constructor(usersRepository, tradingSymbolsService) {
    this._usersRepository = usersRepository
    this._tradingSymbolsService = tradingSymbolsService
  }

  async createOne(body) {
    return this._usersRepository.createOne(body)
  }

  async toggleTradingSymbols(id, { event, symbolId }) {
    if (!(await this._tradingSymbolsService.getOneById(symbolId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'symbol not found')
    }

    if (
      enums.users.toggleSymbolsEvents.ADD === event &&
      (await this._usersRepository.findOneByFilter({ _id: id, tradingSymbolsIds: symbolId }))
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'trading symbol already in user favorites')
    }

    if (
      enums.users.toggleSymbolsEvents.REMOVE === event &&
      (await this._usersRepository.findOneByFilter({ _id: id, tradingSymbolsIds: { $ne: symbolId } }))
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'trading symbol not in user favorites')
    }

    const delegator = {
      [enums.users.toggleSymbolsEvents.ADD]: '$push',
      [enums.users.toggleSymbolsEvents.REMOVE]: '$pull',
    }

    return this._usersRepository.runModificationCommand(
      { _id: id },
      { [delegator[event]]: { tradingSymbolsIds: symbolId } }
    )
  }

  async getOne(filter, options) {
    return this._usersRepository.findOneByFilter(filter, options)
  }

  async getList(filter, options) {
    return this._usersRepository.findList(filter, options)
  }
}

module.exports = UsersService
