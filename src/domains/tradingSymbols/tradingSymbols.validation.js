const Joi = require('joi')

exports.getList = {
  query: Joi.object({
    userId: Joi.string(),
  }),
}
