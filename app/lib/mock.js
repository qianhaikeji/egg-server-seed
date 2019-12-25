const _ = require('lodash')
const moment = require('moment')
const redis = require('../lib/redis')
const faker = require('faker')

faker.locale = 'zh_CN'

class Mock {
  constructor (ctx) {
    this.ctx = ctx
    this.logger = this.ctx.app.logger
  }

  async initSn () {
    await redis.checkAndUpdateSNPool(this.ctx)
  }

  async fakerModel (modelName) {
    const attrs = this.ctx.model[modelName].rawAttributes
    const data = _
      .chain(attrs)
      .pickBy((value, key) => {
        // console.log(value, key)
        return !_.includes(['id', 'createdAt', 'updatedAt'], key) && value.faker
      })
      .mapValues(value => {
        return eval(`${value.faker}`)
      })
      .value()
    return data
  }

  async initSysSetting () {
    let settings = [
      // {
      //   k: 'xxxx', 
      //   v: { amount: 25 }
      // },
    ]
    for (let setting of settings) {
      await this.ctx.service.core.system.addSetting(setting)
    }
  }

  async initAdministrator() {
    await this.logger.info('初始化管理员')
    const {superUser} = this.ctx.app.config.server
    const exist = await this.ctx.service.common.admin.getAdminByUsername(superUser.username)
    if (!exist) {
      await this.ctx.service.common.admin.addAdmin(superUser)
    }
  }

  // async mockChannel () {
  //   for (let i of _.range(11)) {
  //     try {
  //       const data = await this.fakerModel('Channel')
  //       if (i === 0) {
  //         delete data.parentId
  //       }
  //       data.password = '123456'
  //       await this.ctx.service.common.channel.addChannel(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
     
  //   }
  // }

  async initialize() {
    await this.initAdministrator()

    // await this.initSn()

    let { ctx } = this
    if (ctx.app.config.server.mockEnable === true) {
      // do mock here
    }
  }
}

module.exports = Mock