const { EventEmitter } = require('events');
const { Command } = require('./modules');

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
    prefix = ['>'],
  }) {
    super();
    this.discord = discord;
    this.prefixes = Array.isArray(prefix) ? prefix : [prefix];
  }

  static get Command() {
    return Command;
  }
};
