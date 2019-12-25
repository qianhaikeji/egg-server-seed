const _ = require('lodash')

function isEmpty (data) {
  if (data instanceof String) {
    if (!data || data.trim() === '') {
      return true
    } else {
      return false
    }
  }

  if (data instanceof Array) {
    return data.length === 0
  }

  return data === null || data === undefined
}

function checkInputParams (params = []) {
  for (let param of params) {
    if (isEmpty(param.value)) {
      throw new Error(param.error)
    }
  }
}

module.exports = {
  isEmpty,
  checkInputParams
}