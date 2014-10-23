var requirejs = require("requirejs"),
    path = require('path');

requirejs.config({
    baseUrl: path.join(__dirname, '../../', 'node_modules/treehugger/lib'),
    nodeRequire: require
});

requirejs('treehugger/traverse');

module.exports = requirejs('treehugger/tree');
