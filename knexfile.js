module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/alludio.db3'
    },
    useNullAsDefault: 'true',
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations' 
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};