const utils = require('./utils')

/**
 * @apiDefine adminRequestEntity 评后台用户请求实体
 * @apiParam {Integer} [id] (body参数) id。
 * @apiParam {String} username (body参数)账号。
 * @apiParam {String} [nickname] (body参数)昵称。
 */

/**
 * @apiDefine adminResponseEntity 后台用户响应实体
 * @apiSuccess {Integer} rows.id id。
 * @apiSuccess {String} rows.username 账号。
 * @apiSuccess {String} rows.nickname 昵称。
 * @apiSuccess {String} rows.superUser 是否为超级用户
 */

module.exports = app => {
  const { STRING, INTEGER, DATE, JSON, DOUBLE, BOOLEAN } = app.Sequelize

  const Table = app.model.define('admin', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      faker: `faker.internet.userName()`
    },
    password: {
      type: STRING(128),
      faker: '123456'
    },
    nickname: {
      type: STRING,
      faker: `faker.name.findName()`
    },
    superUser: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    tableName: 'admin'
  })
  
  utils.extendModel(Table)
  return Table
}


