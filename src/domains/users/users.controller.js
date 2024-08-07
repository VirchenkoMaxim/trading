const autoBind = require('auto-bind')
const httpStatus = require('http-status')
const { ApiError } = require('../../shared')

class UsersController {
  /**
   * @param {UsersService} usersService
   */
  constructor(usersService) {
    autoBind(this)
    this._usersService = usersService
  }

  async createOne({ body }) {
    const result = await this._usersService.createOne(body)
    return { statusCode: httpStatus.CREATED, result: { id: result.id } }
  }

  async toggleTradingSymbols({ params, body }) {
    const result = await this._usersService.toggleTradingSymbols(params.id, body)

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')

    return { statusCode: httpStatus.OK }
  }

  async getList() {
    const result = await this._usersService.getList({}, { select: { _id: 1, name: 1 } })
    return { statusCode: httpStatus.OK, result }
  }

  async getOne({ params }) {
    const result = await this._usersService.getOne({ _id: params.id }, { select: { _id: 1, name: 1 } })

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')

    return { statusCode: httpStatus.OK, result }
  }

  async getOneByFilter() {
    const result = await this._usersService.getOne({}, { select: { _id: 1, name: 1 } })

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')

    return { statusCode: httpStatus.OK, result }
  }
}

module.exports = UsersController
