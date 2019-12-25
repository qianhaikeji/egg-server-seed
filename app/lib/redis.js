const _ = require('lodash')
const moment = require('moment')

function _genWithDateAndRandom () {
  let datePart = moment().format('YYMMDD')
  let randomPart = Math.floor(Math.random() * 1000000)
  return datePart + _.padEnd(randomPart, 6, '0')
}

async function generateSN (ctx) {
  let sn
  if (ctx.app.config.server.snPool.enable) {
    sn = await ctx.app.redis.spop(ctx.app.config.server.snPool.key)
  } else {
    sn = _genWithDateAndRandom()
  }
  return sn
}

async function checkAndUpdateSNPool (ctx) {
  if (!ctx.app.config.server.snPool.enable) return

  const snKey = ctx.app.config.server.snPool.key

  let  today = moment().format('YYMMDD')
  let member = await ctx.app.redis.srandmember(snKey)
  if (member && _.startsWith(member, today)) {
    ctx.logger.info("redis订单号已经初始化完成!")
    return
  }
  
  ctx.app.redis.del(snKey)
  let maxNum = ctx.app.config.server.snPool.maxNum
  let sns = []
  for (let i=0; i < maxNum; ++i) {
    let sn = _genWithDateAndRandom()
    sns.push(sn)
  }
  await ctx.app.redis.sadd(snKey, sns)
  ctx.logger.info("redis订单号初始化完成!")
}

module.exports = {
  generateSN,
  checkAndUpdateSNPool
}