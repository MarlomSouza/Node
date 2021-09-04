const config = require('config')

module.exports = () => {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERRO: jwtPrivateKey is not defined')
  }

  if (!config.get('MONGODB_URI')) {
    throw new Error('FATAL ERRO: MONGODB_URI is not defined')
  }
}
