const genAliases = function generateAliasesFromAliasesAndID(id, aliases) {
  return [...Set([
    ...aliases.map(alias => alias.toLowerCase()),
    ...aliases.map(alias => alias.toLowerCase().replace(/-/g, '')),
    id.toLowerCase(),
    id.toLowerCase().replace(/-/g, ''),
  ])];
};

const splitArgs = function splitArgumentsIntoSeparateStrings(rawArgs) {
  if (!rawArgs) return [];
  const regex = /(['"])(.+?)\1|\S+/g;
  const args = [];
  let match = null;
  do {
    match = regex.exec(rawArgs);
    if (match) {
      if (match[2]) args.push(match[2]);
      else args.push(match[0]);
    }
  } while (match);
  return args;
};

module.exports = class Command {
  constructor({
    id = null,
    aliases = [],
    group = null,
    description = '',
    details = '',
    examples = [],
    parameters = [],
    run = async ({ message }) => message.reply(`Command '${id}' run not set up properly`),
  }) {
    if (typeof id !== 'string') throw new Error('Command must have string id');
    this.id = id.toLowerCase();
    this.aliases = genAliases(id, aliases);
    this.group = group;
    this.description = description;
    this.details = details;
    this.examples = examples;
    this.parameters = parameters;
    this.run = run;
  }

  registerCmds(cmds) {
    this.cmds = cmds;
    this.registry = cmds.registry;
  }
};
