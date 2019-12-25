'use strict'
const fs = require('fs')
const path = require('path')
const Controller = require('qhkj-framework').Controller

/**
 * @apiDefine admin
 * 管理员
 */

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @api {get} /admins 获取管理员列表
   * @apiVersion 1.0.0
   * @apiGroup admin
   * @apiDescription 获取管理员列表
   * @apiSuccess {Integer} count 结果总数
   * @apiUse pagination
   * @apiUse pageResult
   * @apiUse adminResponseEntity
   */
  async getAdminList () {
    let res = await this.service.common.admin.getAdminList(this.queryParams)
    this.restful.success(res)
  }

  /**
   * @api {get} /admins/:id 获取管理员详情
   * @apiVersion 1.0.0
   * @apiGroup admin
   * @apiDescription 获取管理员详情
   * @apiParam {Integer} id (path参数)管理员id
   * @apiUse adminResponseEntity
   */
  async getAdminDetail () {
    const { id } = this.pathParams
    const res = await this.service.common.admin.getAdmin(id)
    this.restful.success(res)
  }

  /**
   * @api {post} /admins 创建管理员
   * @apiVersion 1.0.0
   * @apiGroup admin
   * @apiDescription 创建管理员
   * @apiUse adminRequestEntity
   * @apiUse adminResponseEntity
   */
  async createAdmin () {
    const res = await this.service.common.admin.addAdmin(this.requestBody)
    this.restful.created(res)
  }

  /**
   * @api {put} /admins/:id 修改管理员
   * @apiVersion 1.0.0
   * @apiGroup admin
   * @apiDescription 修改管理员
   * @apiParam {Integer} id (path参数)管理员id
   * @apiParam {String} nickname (body参数)管理员昵称
   */
  async modifyAdmin () {
    const { id } = this.pathParams
    const res = await this.service.common.admin.modifyAdmin(id, this.requestBody)
    this.restful.success(res)
  }

  /**
   * @api {delete} /admins/:id 删除管理员
   * @apiVersion 1.0.0
   * @apiGroup admin
   * @apiDescription 删除管理员，超级管理员账号不能被删除
   * @apiParam {Integer} id (path参数)管理员id
   */
  async deleteAdmin () {
    const { id } = this.pathParams
    await this.service.common.admin.deleteAdmin(id)
    this.restful.deleted()
  }

  /**
   * @api {put} /admins/:id/resetPassword 修改管理员账号密码
   * @apiVersion 1.0.0
   * @apiGroup admin
   * @apiParam {Integer} id (path参数)管理员id
   * @apiParam {String} password (body参数)新密码
   */
  async changeAdminPassword () {
    const { id } = this.pathParams
    const { password } = this.requestBody
    await this.service.common.admin.changePassword(id, password)
    this.restful.success()
  }
}

module.exports = AdminController
