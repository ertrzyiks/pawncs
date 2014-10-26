(function (PawnParser) {
    'use strict';

    require('./include');
    require('./tryinclude');

    PawnParser.prototype.directive = function (token, type, next) {
        switch (token.content) {
            case '#include':
                next(this.directiveInclude);
                break;

            case '#tryinclude':
                next(this.directiveTryInclude);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }

        return true;
    };
})(require('../pawn_parser'));
