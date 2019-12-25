'use strict'

const _ = require('lodash')
const utils = require('../../lib/utils')
const Service = require('qhkj-framework').Service

class AdminService extends Service {
  constructor(ctx) {
    super(ctx, 'common')
  }

  async getAdminList (params) {
    let conditions = [
    ]
    
    // add custom query here
    // e.g. 
    // if (params.type) {
    //   conditions.push({type: params.type})
    // }

    let queryParams = this.formatPageParams(params)
    if (conditions.length > 0) {
      queryParams.where = {
        [this.app.Sequelize.Op.and]: [
          ...conditions,
          queryParams.where
        ]
      }
    }

    return await this.models.Admin.findAndCountAll(queryParams)
  }

  async getAdmin (id) {
    return await this.models.Admin.findByPk(id)
  }

  async getAdminByUsername (username) {
    return await this.models.Admin.findOne({where: {username}})
  }

  async addAdmin (data) {
    // do params check here!
    try {
      utils.checkInputParams([
        {value: data.username, error: '请填写管理员账号名称'},
        {value: data.password, error: '请填写管理员密码'},
        {value: data.nickname, error: '请填写昵称'},
      ])
    } catch (err) {
      this.throwException(400, err.message)
    }

    let passwdHash = await this.services.auth.encryptPassword(data.password)
    data.password = passwdHash

    let admin = await this.models.Admin.create(data, {transaction: this.t})
    if (!admin) {
      this.throwException(400, '添加管理员失败!')
    }
    return admin
  }

  async modifyAdmin (id, data) {
    let exist = await this.models.Admin.findByPk(id)
    if (!exist) {
      this.throwException(400, '无效的管理员!')
      return
    }

    // add set data code here
    // e.g. exist.name = data.name
    if (!utils.isEmpty(data.nickname)) {
      exist.nickname = data.nickname
    }

    await exist.save({transaction: this.t})
  }  

  async deleteAdmin (id) {
    let exist = await this.models.Admin.findByPk(id)
    if (!exist) {
      return
    }

    if (exist.superUser) {
      this.throwException(400, '超级管理员不能删除!')
    }

    await this.models.Admin.destroyById(exist.id, {transaction: this.t})
  }

  async changePassword (id, password) {
    const admin = await this.services.auth.getAdminProfile()
    if (String(admin.id) !== String(id) && !admin.superUser) {
      this.throwException(400, '不能修改别人的密码!')
    }

    const adminForModify = await this.getAdmin(id)
    if (!adminForModify) {
      this.throwException(400, '无效的管理员!')
    }

    let passwdHash = await this.services.auth.encryptPassword(password)
    adminForModify.password = passwdHash

    await adminForModify.save({transaction: this.t})
  }
}

module.exports = AdminService
