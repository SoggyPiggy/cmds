const Command = require('./Command');

const createGroup = function createCommandGroup({ id = null, name = null }) {
  return {
    id,
    name,
    commands: new Map(),
  };
};

module.exports = class CommandRegistry {
  constructor(cmds) {
    this.cmds = cmds;
    this.commands = new Map();
    this.commandAliases = new Set();
    this.groups = new Map([[null, createGroup()]]);
  }

  createGroup({ id, name }) {
    if (typeof id !== 'string') throw new Error('Command group id needs to be string');
    if (this.groups.has(id)) throw new Error(`Command group id '${id}' is already in use`);
    const group = typeof name === 'string' ? createGroup({ id, name }) : createGroup({ id, name: id });
    this.groups.set(group.id, group);
    return this;
  }

  createGroups(groups = []) {
    groups.forEach((group) => { this.createGroup(group); });
    return this;
  }

  registerCommand(constructor) {
    if (typeof constructor !== 'function') throw new Error('Cannot register improper command constructor');
    const command = new constructor();
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
      constructor() {
        super(options);
      }
    });
  }
};
