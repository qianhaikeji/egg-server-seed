const _ = require('lodash')
const MOCK = Symbol('Application#mock')
const MockClass= require('../lib').Mock

// this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
module.exports = {
  get mock () {
    if (!this[MOCK]) {
      const ctx = this.createAnonymousContext();
      this[MOCK] = new MockClass(ctx)
    }
    return this[MOCK]
  },
}

