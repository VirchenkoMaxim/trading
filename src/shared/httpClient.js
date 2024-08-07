const axios = require('axios')
const ApiError = require('./ApiError')
const httpStatus = require('http-status')

const composeError = (context, message) => `${context} error: ${message}`

/**
 *
 * @param method
 * @param url
 * @param [data]
 * @param [params]
 * @param context
 * @return {Promise<any>}
 */
exports.sendRequest = async ({ method, url, data, params }, context) => {
  try {
    const res = await axios({
      method,
      url,
      ...(data && { data }),
      ...(params && { params }),
    })
    return res.data
  } catch (error) {
    if (error.response)
      throw new ApiError(
        error.response.status,
        composeError(context, JSON.stringify(error.response.data)),
        error.response.data
      )

    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, composeError(context, JSON.stringify(error.message)))
  }
}
