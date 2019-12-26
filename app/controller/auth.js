'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine auth
 * 登录认证
 */
class AuthController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @api {post} /admin/token 管理员登录
   * @apiVersion 1.0.0
   * @apiGroup adminAuth
   * @apiDescription 账号密码登录，返回token和profile
   * @apiParam {String} username （body参数）账号
   * @apiParam {String} password （body参数）密码
   * @apiSuccess {String} token token
   * @apiUse adminResponseEntity
   */
  async adminLogin () {
    const res = await this.service.common.auth.getAdminToken(this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {get} /admin/profile 获取管理员账号信息
   * @apiVersion 1.0.0
   * @apiGroup adminAuth
   * @apiUse adminResponseEntity
   */
  async getAdminProfile () {
    const res = await this.service.common.auth.getAdminProfile()
    this.restful.success(res)
  }
}

module.exports = AuthController
