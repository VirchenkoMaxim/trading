const tag = 'trading symbols'
const validation = require('./tradingSymbols.validation')

exports.getList = Object.assign(
  {
    tags: [tag],
    description: 'get trading symbols list',
  },
  validation.getList
)
