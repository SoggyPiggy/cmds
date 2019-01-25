const { EventEmitter } = require('events');
const { Command, CommandRegistry } = require('./modules');

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
    prefix = ['>'],
  }) {
    super();
    this.discord = discord;
    this.registry = new CommandRegistry(this);
    this.prefixes = Array.isArray(prefix) ? prefix : [prefix];
  }

  static get Command() {
    return Command;
  }
};
