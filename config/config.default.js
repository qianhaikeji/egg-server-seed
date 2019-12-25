const path = require('path');
const fs = require('fs');

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1112313ssxa'

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ]

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // }

  
  config.static = {
    // maxAge: 31536000,
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public/uploads')
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8080' ],
  }

  config.logger = {
    level: 'INFO',
    consoleLevel: 'INFO',
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'seed',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'mysql',
    define: {
      underscored: false,
      freezeTableName: true,
      rowFormat: 'dynamic'
    },
    timezone: '+08:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    logging: false
  }

  config.knex = {
    client: {
      dialect: 'mysql2',
      connection: {
        database: 'seed',
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'mysql',
        timezone: '+08:00',
      },
      pool: { 
        min: 0, 
        max: 10,
      },
      acquireConnectionTimeout: 30000,
    },
    app: true,
    agent: false,
  }

  config.redis = {
    client: {
      host: 'localhost',   // Redis host
      port: 6379,          // Redis port
      password: 'password',
      db: 0,
    },
  }
  
  config.jwt = {
    secret: 'seed',
    enable: false,
    // match: '/jwt', // optional
  }

  config.cluster = {
    listen: {
      port: 8080,
      hostname: '0.0.0.0',
      // path: '/var/run/egg.sock',
    }
  }

  config.server = {
    superUser: {
      username: 'admin',
      nickname : '超级管理员',
      password: '123',
      superUser: true
    },
    snPool: {
      enable: false,
      maxNum: 100000,
      key: 'seed_sn'
    }
  }

  config.imc = {
    apiList: [
      // {
      //   "moduleName": "common",
      //   "api": [
      //     {"name": "getAdminProfile", "service": "auth", "method": "getAdminProfile", "doc": "获取当前admin用户"},
      //     {"name": "getChannel", "service": "channel", "method": "getChannel", "doc": "根据渠道id获取渠道"},
      //   ]
      // }
    ],
    hookList: [
      // {
      //   "sourceModule": "finance",
      //   "hooks": [
      //     {
      //       "hookName": "onBillFilled",
      //       "doc": "交易单撮合成功, 参数: {bill}",
      //       "listeners": [
      //         {"module": "activity", "service": "billEgg", "method": "handleBillFilled"},
      //       ]
      //     }
      //   ]
      // }
    ]
  }

  config.customLogger = {
    knex: {
      file: 'egg-knex.log',
    },
  };

  return config
}
