'use strict'

module.exports = app => {
  const { router, controller, middleware } = app

  const jwtMiddleware = middleware.jwt()

  router.get('/api/admins', controller.admin.getAdminList)
  router.get('/api/admins/:id', controller.admin.getAdminDetail)
  router.post('/api/admins', controller.admin.createAdmin)
  router.put('/api/admins/:id', controller.admin.modifyAdmin)
  router.delete('/api/admins/:id', controller.admin.deleteAdmin)
  router.put('/api/admins/:id/resetPassword', controller.admin.changeAdminPassword)

}
