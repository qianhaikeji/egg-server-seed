'use strict'
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller, middleware } = app

  const jwtMiddleware = middleware.jwt()

  require('./router/admin')(app)

  // add your router here
}
