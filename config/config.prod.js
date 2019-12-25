module.exports = appInfo => {
  const config = exports = {}
  config.server = {
    dbMode: 'update',
    mockEnable: false
  }

  config.cluster = {
    listen: {
      port: 8081,
      hostname: '127.0.0.1',
    }
  }

  return config
}
