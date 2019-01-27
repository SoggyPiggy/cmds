const { DMChannel } = require('discord.js');
const { EventEmitter } = require('events');
const { Command, CommandRegistry } = require('./modules');

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

  async processMessage(message) {
    const { content, channel } = message;
    const prefixRegex = new RegExp(`^(${this.prefixes.map(prefix => prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})? ?(.+)`);
    const prefixMatch = prefixRegex.exec(content);
    if (!(prefixMatch[1] || channel instanceof DMChannel)) return;
    const [command, operation, argumentString] = prefixMatch[2].match(/(\S?)(?: (.+))/);
    const arguments = argumentString.match(/(['"]).+\1|\S+/).replace(/^(['"])?(.+?)\1$/, '');
  }

  static get Command() {
    return Command;
  }
};
