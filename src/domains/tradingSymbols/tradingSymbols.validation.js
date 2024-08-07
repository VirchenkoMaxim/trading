const Joi = require('joi')
const { enums } = require('../../shared')

exports.getList = {
  query: Joi.object({
    userId: Joi.string().required(),
    select: Joi.string()
      .valid(...Object.values(enums.tradingSymbols.listSelections))
      .required(),
  }).required(),
}
