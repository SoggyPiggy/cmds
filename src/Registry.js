const createGroup = function createCommandGroup({ id = null, name = null }) {
  return {
    id,
    name,
    commands: new Map(),
  }
}

module.exports = class Registry {
  constructor() {
    this.commands = new Map();
    this.groups = new Map([[null, createGroup()]]);
  }

  createGroup({id, name}) {
    if (typeof id !== 'string') throw new Error('Command group id needs to be string');
    if (this.groups.has(id)) throw new Error(`Command group id '${id}' is already in use`);
    const group = typeof name === 'string' ? createGroup({ id, name }) : createGroup ({ id, id });
    this.groups.set(group.id, group);
    return this;
  }
  
  createGroups(groups = []) {
    groups.forEach((group) => {
      try {
        this.createGroup(group);
      } catch (error) {
        console.warn(error);
      }
    });
    return this;
  }
}