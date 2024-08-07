const { enums } = require('../../shared')
const { httpClient } = require('../../shared')

class TradingSymbolsProvider {
  _url = 'https://testnet.binancefuture.com/fapi/v1/ticker/price'

  _context = 'Trading Symbols'

  async getList() {
    return httpClient.sendRequest({ method: enums.http.methods.GET, url: this._url }, this._context)
  }

  async getOneById(symbol) {
    try {
      return await httpClient.sendRequest(
        {
          method: enums.http.methods.GET,
          url: this._url,
          params: { symbol },
        },
        this._context
      )
    } catch (e) {
      if (e.data.code === -1121) {
        return null
      }
      throw e
    }
  }
}

module.exports = TradingSymbolsProvider
