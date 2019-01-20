const { EventEmitter } = require('events');

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
  }) {
    super();
    this.discord = discord;
  }
}