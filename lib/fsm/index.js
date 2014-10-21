var data;

exports.states = {};
exports.events = {};

data = require("./program");
exports.states.PROGRAM = data.PROGRAM;

data = require("./directives/include");
exports.states.DIRECTIVE_INCLUDE = data.DIRECTIVE_INCLUDE;
exports.events.onenterDIRECTIVE_INCLUDE = data.onenter;
