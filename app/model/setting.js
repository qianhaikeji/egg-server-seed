const utils = require('./utils')

/**
 * @apiDefine settingRequestEntity  配置响应实体
 * @apiSuccess {Integer} id id.
 * @apiSuccess {String} k 配置key
 * @apiSuccess {JSON} v 配置value，json形式存储
 */

/**
 * @apiDefine settingResponseEntity 配置请求实体
 * @apiParam {String} k 配置key
 * @apiParam {JSON} v 配置value，json形式存储
 */
module.exports = app => {
  const { STRING, INTEGER, JSON } = app.Sequelize

  const Table = app.model.define('setting', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    k: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    v: {
      type: JSON,
      defaultValue: {}
    }
  }, {
    tableName: 'setting'
  })
  
  utils.extendModel(Table)
  Table.findByKey = async (k) => {
    return Table.findOne( {where: { k } })
  }
  return Table
}