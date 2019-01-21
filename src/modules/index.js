module.exports = require('fs')
.readdirSync(__dirname)
.filter(file => file !== 'index.js')
.map(file => require(`${__dirname}/${file}`))
.reduce((previous, func) => {
  return { ...previous, [func.name]: func }
}, {});
