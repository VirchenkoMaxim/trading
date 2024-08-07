exports.toFixedString = (value, fractionDigits = 2) => value.toFixed(fractionDigits)

/**
 *
 * @param {string} number
 * @returns {number}
 */
exports.decimalCount = (number) => {
  const [, count = ''] = number.split('.')

  return count.length
}

exports.arrayToMap = (array, key) => new Map(array.map((item) => [item[key], item]))
