(function (module) {
    'use strict';

    var PawnParser = require('./pawn_parser');

    require('./directives');
    require('./function-definition');
    require('./identifier');

    module.exports = PawnParser;
})(module);
