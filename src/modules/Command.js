const Parameter = require('./Parameter');

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
  constructor(cmds, {
    id = null,
    aliases = [],
    group = null,
    description = '',
    details = '',
    examples = [],
    parameters = [],
    run = async ({ message }) => message.reply(`Command '${id}' run not set up properly`),
  }) {
    this.cmds = cmds;
    this.registry = cmds.registry;
    if (typeof id !== 'string') throw new Error('Command must have string id');
    this.id = id.toLowerCase();
    this.aliases = genAliases(id, aliases);
    this.group = group;
    this.description = description;
    this.details = details;
    this.examples = examples;
    this.parameters = parameters.map((parameter, index) => {
      const isLast = index === parameters.length - 1;
      return new Parameter(this, isLast, parameter);
    });
    this.run = run;
  }

  async process(data) {
    const { rawArguments } = data;
    const arguments = {};
    let lastIndex = 0;
    this.parameters.forEach((parameter) => {
      const { value, index } = await parameter.process(rawArguments, lastIndex);
    }
  }
};
