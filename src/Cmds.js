const { DMChannel } = require('discord.js');
const { EventEmitter } = require('events');
const {
  Command,
  CommandRegistry,
  ParameterType,
} = require('./modules');

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
    prefix = ['>'],
  }) {
    super();
    this.discord = discord;
    this.registry = new CommandRegistry(this);
    this.prefixes = [prefix].flat();

    this.discord.on('message', message => this.processMessage(message));
  }

  processMessage(message) {
    const prefixRegex = new RegExp(`^(${this.prefixes.map(prefix => prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})? ?(.+)`);
    const prefixMatch = prefixRegex.exec(message.content);
    if (!(prefixMatch[1] || message.channel instanceof DMChannel)) return;
    const [command, operation, rawArguments] = prefixMatch[2].match(/(\S+)(?: (.+))?/);
    this.registry.processOperation({
      message,
      command,
      operation,
      rawArguments,
    });
  }

  static get Command() {
    return Command;
  }

  static get ParameterType() {
    return ParameterType;
  }
};
