const Joi = require('joi')
const { enums } = require('../../shared')

exports.getOne = {
  params: Joi.object({
    id: Joi.string(),
  }),
}

exports.createOne = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .required(),
}

exports.toggleTradingSymbols = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      event: Joi.string()
        .valid(...Object.values(enums.users.toggleSymbolsEvents))
        .required(),
      symbolId: Joi.string().required(),
    })
    .required(),
}
