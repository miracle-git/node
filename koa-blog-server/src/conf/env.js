const env = process.env.NODE_ENV;
let config;

if (env === 'development') {
  config = {
    mysql: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '1984_$hmy810',
      database: 'myblog'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379
    }
  };
}

if (env === 'production') {
  config = {
    mysql: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '1984_$hmy810',
      database: 'myblog'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379
    }
  };
}

module.exports = config;
