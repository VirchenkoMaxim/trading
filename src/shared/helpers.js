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
