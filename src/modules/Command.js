const genAliases = function generateAliasesFromAliasesAndID(id, aliases) {
  return [...Set([
    ...aliases.map(alias => alias.toLowerCase()),
    ...aliases.map(alias => alias.toLowerCase().replace(/-/g, '')),
    id.toLowerCase(),
    id.toLowerCase().replace(/-/g, ''),
  ])];
};

module.exports = class Command {
  constructor({
    id = null,
    aliases = [],
    group = null,
    description = '',
    details = '',
    examples = [],
    args = [],
    run = message => message.reply(`Command '${id}' run not set up properly`),
  }) {
    if (typeof id !== 'string') throw new Error('Command must have string id');
    this.id = id.toLowerCase();
    this.aliases = genAliases(id, aliases);
    this.group = group;
    this.description = description;
    this.details = details;
    this.examples = examples;
    this.args = args;
    this.run = run;
  }
};