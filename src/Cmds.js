const { EventEmitter } = require('events');
const { Command, CommandRegistry } = require('./modules');

const isCommand = function isMessageACommand(message) {
  // TODO: Add check whether message received is a command
};

const parseCommand = function parseMessageIntoUsableStrings(message) {
  // TODO: Add the logic is parsing the string
};

const command = async function beginCommandProcess(message) {
  if (!isCommand(message)) return;
  const [raw, command, parameters] = parseCommand(message.content);
  // TODO: Finish off the logic
};

module.exports = class Cmds extends EventEmitter {
  constructor(discord, {
    prefix = ['>'],
  }) {
    super();
    this.discord = discord;
    this.registry = new CommandRegistry(this);
    this.prefixes = Array.isArray(prefix) ? prefix : [prefix];

    this.discord.on('message', message => isCommand(message));
  }

  static get Command() {
    return Command;
  }
};
