const moment = require('moment')
const enums = require('./enum')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const crypto = require('crypto');
const redis = require('../lib/redis')

// 格式化时间
function formatTime (time) {
  return moment(time).format('YYYY-MM-DD hh:mm:ss')
}

async function getCurrUser (ctx) {
  const token = ctx.header.authorization
  // this.logger.info('token==' + token)
  let jwtInfo = await verify(token.split(' ')[1], ctx.app.config.jwt.secret)
  return jwtInfo.data
}

async function genSn (ctx) {
  // 1. UUID，太长不行。v1，v4都不行
  // let uuid = uuidv1()
  // uuid = uuid.replace(/\-/g,'')
  // return uuid
  // 2. 这个库纯粹根据时间，也太长。
  // return orderid.generate()
  // // // 重新转换为时间
  // // orderid.getTime(id)
  // 3. 时间加随机。时间部分6位，随机部分为6位。冲突域为天中的随机数。
  // let datePart = moment().format('YYMMDD')
  // let radomPart = Math.floor(Math.random() * 1000000)
  // return datePart + radomPart
  // 4. 使用 redis，后6位由每天晚上不重复的数列，第二天直接用。
  return await redis.generateSN(ctx)
}

function getMD5(pwd) {
  var md5 = crypto.createHash('md5');
  var result = md5.update(pwd).digest('hex');
  return result;
}

function checkURL(url) {
  let str = url
  let regx = /http(s)?:\/\//
  let objExp = new RegExp(regx)
  return objExp.test(str)
}

module.exports = {
  formatTime,
  enums,
  getCurrUser,
  getMD5,
  genSn,
  checkURL
}