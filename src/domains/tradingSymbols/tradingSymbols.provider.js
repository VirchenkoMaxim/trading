const { httpMethods } = require('../../enum/http')
const { httpClient } = require('../../shared')

class TradingSymbolsProvider {
  _url = 'https://testnet.binancefuture.com/fapi/v1/ticker/price'

  _context = 'Trading Symbols'

  async getList() {
    return httpClient.sendRequest({ method: httpMethods.GET, url: this._url }, this._context)
  }

  async getOneById(symbol) {
    try {
      return { symbol: 'BTCUSDT', price: '56800.00', time: 1723033374931 }
      return await httpClient.sendRequest(
        {
          method: httpMethods.GET,
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
