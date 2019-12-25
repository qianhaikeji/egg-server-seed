module.exports = appInfo => {
  const config = exports = {}
  config.server = {
    dbMode: 'update',
    mockEnable: false
  }
  
  return config
}
