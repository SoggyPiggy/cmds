const { EventEmitter } = require('events');
const { Command } = require('./modules');

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
  }) {
    super();
    this.discord = discord;
  }

  static get Command() {
    return Command;
  }
};
