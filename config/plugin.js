const path = require('path')

exports.redis = {
  enable: false,
  package: 'egg-redis',
}

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

// 复杂查询使用knex直接操作sql
exports.knex = {
  enable: false,
  package: 'egg-knex'
}