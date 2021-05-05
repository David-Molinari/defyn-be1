let secret

if (process.env.NODE_ENV == 'development') {
  const SecretsLocal = require('./secrets-local');
  secret = SecretsLocal.jwtSecret
} else {
  secret = process.env.JWT_SECRET
}

module.exports = {
    jwtSecret: secret,
    mailPassword: process.env.EMAIL_PASS
  };