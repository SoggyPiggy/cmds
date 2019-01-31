const utils = require('./../utils');

module.exports = class Utils {
  constructor(cmds) {
    this.cmds = cmds;
  }

  parseMessage(message) {
    return utils.parseMessage(this.cmds, message);
  }
};
