const jwt = require('koa-jwt')

module.exports = (options, app) => {
  return async function (ctx, next) {
    // 全部默认开放，个别需要认证的，在 router 中配。否则下面 path 配起来太多。
    await next()

    // await jwt({ secret: options.secret }).unless({
    //   // 下面是正则的写法。如： /login 会同时过滤掉 weapp/login 和 admin/login
    //   // 因此，如果仅仅想过滤 weapp/login，则只填写 weapp/login
    //   path: [
    //     /\/weapp\/login\/?$/,
    //     /\/system\/version\/?$/,
    //     /\/public/,
    //     /\/wechat\/message\/?$/,
    //     // 获取打卡详情.
    //     // ([^\/]+?) 为不包含“/”的一个或多个字符。否则会把下面的多种情况，全部包含进去。
    //     // \/?$ 为最后的“/”可有可无，但必须是结尾，后面不能再有字符了。
    //     /\/punches\/([^\/]+?)\/?$/,
    //     // 获取评论列表
    //     /\/punches\/([^\/]+?)\/comments\/?$/,
    //     // 获取打卡列表
    //     /\/punches\/?$/,
    //     // 前端获取今日相关
    //     /\/api\/status/,
    //     // 统计相关
    //     /\/api\/statistics/

    //   ] 
    // })(ctx, next)
  }
}
