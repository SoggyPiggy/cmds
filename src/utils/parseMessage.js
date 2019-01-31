const { DMChannel } = require('discord.js');

module.exports = function parseMessage(cmds, message) {
  const prefixRegex = new RegExp(`^(${cmds.prefixes.map(prefix => prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})? ?(.+)`);
  const prefixMatch = prefixRegex.exec(message.content);
  const prefix = prefixMatch[1];
  const isPrefixed = typeof prefix === 'string';
  const isDM = message.channel instanceof DMChannel;
  const isCommand = isPrefixed || isDM;
  const [command, operation, rawArguments] = prefixMatch[2].match(/(\S+)(?: (.+))?/);
  return {
    isDM,
    isPrefixed,
    isCommand,
    command,
    operation,
    rawArguments,
  };
};
