'use strict';

const Service = require('qhkj-framework').Service;
const utils = require('../../lib/utils')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * token 过期时间: 7天 
 * 60 seconds * 60 minutes = 1 hour
 */
const EXPIRATION = 60 * 60 * 24 * 7

class AuthService extends Service {
  constructor(ctx) {
    super(ctx, 'common');

    this.SALT_ROUNDS = this.config.bcrypt.saltRounds
    this.JWT_SECRET = this.config.jwt.secret
  }
  
  async getAdminToken(data) {
    let admin = await this.models.Admin.findOne({where: { username: data.username }})
    if(!admin) {
      this.throwException(401, '用户名不存在')
    }

    await this.verifyEncryptedPassword(data.password, admin.password)
 
    let resp = {
      profile: admin,
      token: jwt.sign({
        data: {
          'type': 'admin',
          'id': admin.id
        },
        exp: Math.floor(Date.now() / 1000) + EXPIRATION,
      }, this.JWT_SECRET),
    }
    return resp
  }

  async getAdminProfile() {
    const id = await this.getProfileId('admin')
    const profile = await this.models.Admin.findByPk(id)
    if (!profile) {
      this.throwException(401, '无效的用户')
    }
    
    return profile
  }

  async getProfileId (profileType) {
    const token = this.ctx.token
    if (!token) {
      this.throwException(401, '无效的token')
    }
    
    const tokenValue = token.split(' ')[1]
    if (utils.isEmpty(tokenValue)) {
      this.throwException(401, '无效的token')
    }

    let jwtInfo = {}
    try {
      jwtInfo = jwt.verify(tokenValue, this.JWT_SECRET)
    } catch (err) {
      this.ctx.logger.error(JSON.stringify(err))
      this.throwException(401, '无效的token')
    }

    const {type, id} = jwtInfo.data
    console.log(type, id)
    if (type !== profileType || utils.isEmpty(id)) {
      this.throwException(401, '无效的token')
    }

    return id
  }

  async encryptPassword (password) {
    return await bcrypt.hashSync(password, this.SALT_ROUNDS)
  }

  async verifyEncryptedPassword (password1, password2) {
    const valid = await bcrypt.compareSync(password1, password2)
    if (!valid) {
      this.throwException(401, '密码错误')
    }
  }
}

module.exports = AuthService;
