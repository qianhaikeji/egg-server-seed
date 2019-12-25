module.exports = app => {
    app.beforeStart(async () => {
        app.logger.info('beforeStart')
    });
    app.messenger.on('start-init-service', async () => {
        if (app.model) {
            app.logger.info('数据库初始化')
            await app.model.sync({force: app.config.server.dbMode === 'create'})
            await app.mock.initialize()
        }
    });
}
