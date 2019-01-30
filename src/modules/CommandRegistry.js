const Command = require('./Command');
const CommandGroup = require('./CommandGroup');
const ParameterType = require('./ParameterType');

module.exports = class CommandRegistry {
  constructor(cmds) {
    this.cmds = cmds;
    this.commands = new Map();
    this.groups = new Map([[null, new CommandGroup()]]);
    this.parameterTypes = new Map([[null, new ParameterType({ id: 'string' })]]);
  }

  processOperation(data) {
    const command = this.commands.get(data.operation);
    if (!command) return; // TODO: Add command failure checking for proper rewritten commands
    command.process(data);
  }

  createGroup({ id, name }) {
    if (typeof id !== 'string') throw new Error('Command group id needs to be string');
    if (this.groups.has(id)) throw new Error(`Command group id '${id}' is already in use`);
    const group = new CommandGroup({ id, name });
    this.groups.set(group.id, group);
    return this;
  }

  createGroups(groups = []) {
    groups.forEach((group) => { this.createGroup(group); });
    return this;
  }

  registerCommand(constructor) {
    if (typeof constructor !== 'function') throw new Error('Cannot register improper command constructor');
    const command = new constructor(this.cmds);
    if (command instanceof Command) throw new Error('Command constructor did not produce Command instance');
    command.registerCmds(this.cmds);
    if (!this.groups.has(command.group)) this.createGroup({ id: command.group });
    const group = this.groups.get(command.group);
    command.aliases.forEach((alias) => {
      if (this.commands.has(alias)) throw new Error(`Command with '${alias}' alias already registered`);
      else {
        this.commands.set(alias, command);
        group.commands.set(alias, command);
      }
    });
  }

  createCommand(options = {}) {
    this.registerCommand(class extends Command {
      constructor(cmds) {
        super(cmds, options);
      }
    });
  }
};
