const SecretsLocal = require('./secrets-local');

let secret

if (process.env.NODE_ENV == 'production') {
  secret = process.env.JWT_SECRET
} else {
  secret = SecretsLocal.jwtSecret
}

module.exports = {
    jwtSecret: secret,
    mailPassword: process.env.EMAIL_PASS
  };