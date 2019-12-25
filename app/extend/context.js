const _ = require('lodash')
const Token = Symbol('Context#token')

// this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
module.exports = {
  // get token () {
  //   if (!this[Token]) {
  //     this[Token] = this.get('authorization')
  //   }
  //   return this[Token]
  // }
}

