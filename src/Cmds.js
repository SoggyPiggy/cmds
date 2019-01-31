const { DMChannel } = require('discord.js');
const { EventEmitter } = require('events');
const {
  Command,
  CommandRegistry,
  ParameterType,
  Utils,
} = require('./modules');

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
    prefix = ['>'],
  }) {
    super();
    this.discord = discord;
    this.registry = new CommandRegistry(this);
    this.prefixes = [prefix].flat();
    this.utils = new Utils(this);
    this.discord.on('message', message => this.processMessage(message));
  }

  processMessage(message) {
    const data = this.utils.parseMessage(message);
    this.registry.processOperation(data);
    this.emit('messageParsed', data);
  }

  static get Command() {
    return Command;
  }

  static get ParameterType() {
    return ParameterType;
  }
};
