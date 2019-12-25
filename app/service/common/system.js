const _ = require('lodash')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class SystemService extends Service {
  constructor(ctx) {
    super(ctx, 'common')
  }

  async getVersion () {
    return this.config.pkg.version
  }

  async saveSetting (key, data) {
    let exist = await await this.models.Setting.findByKey(key)
    if (!exist) {
      return await this.models.Setting.create({k: key, v: data}, {transaction: this.t})
    }

    exist.v = data
    return await exist.save({transaction: this.t})
  }

  async getSettingByKey (key) {
    return await this.models.Setting.findByKey(key)
  }

}

module.exports = SystemService