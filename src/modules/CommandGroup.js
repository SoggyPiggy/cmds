module.exports = class CommandGroup {
  constructor({ id = null, name = id }) {
    this.id = id;
    this.name = name;
    this.commands = new Map();
  }
};
