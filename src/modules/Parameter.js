module.exports = class Parameter {
  constructor(command, isLast, {
    type = null,
    id = null,
    name = id,
    prompt = '',
    description = null,
    defaultValue = null,
    required = defaultValue === null,
    regex = isLast ? /.+/g : /(['"])(.+?)\1|\S+/g,
  }) {
    if (typeof id !== 'string') throw new Error('CommandParameter id has to be string');
    this.command = command;
    this.cmds = command.cmds;
    this.registry = command.registry;
    this.type = this.registry.parameterTypes.get(type);
    if (!this.type) throw new Error(`Parameter '${id}' from Command '${command.id}' has a incorrect type`);
    this.id = id;
    this.name = name;
    this.prompt = prompt;
    this.description = description;
    this.defaultValue = defaultValue;
    this.required = required;
    this.regex = regex;
  }
};
