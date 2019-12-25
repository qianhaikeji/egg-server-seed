const moment = require('moment')

module.exports = app => {
  return {
    schedule: {
      cron: '0 0 3 * * *',
      // * */30 8-18 * * *
      type: 'worker'
      // immediate: true,
      // disable: app.config.robotType.type === 'sale',
    },
    async task(ctx) {
    }
  }
}
