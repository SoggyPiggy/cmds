module.exports = class ParameterType {
  constructor({
    id = null,
    parse = async data => data,
    validate = async () => true,
  }) {
    if (typeof id !== 'string') throw new Error('ParameterType must have string id');
    this.id = id.toLowerCase();
    this.parse = parse;
    this.validate = validate;
  }
};
