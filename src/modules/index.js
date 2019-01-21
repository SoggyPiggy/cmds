module.exports = require('fs')
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  // eslint-disable-next-line import/no-dynamic-require, global-require
  .map(file => require(`${__dirname}/${file}`))
  .reduce((previous, func) => ({ ...previous, [func.name]: func }), {});
