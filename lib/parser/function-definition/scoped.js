(function (PawnParser) {
    'use strict';

    PawnParser.prototype.functionDefinitionScope = function (token, type, next) {
        switch (type) {
            case 'identifier':
                next(this.identifier);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }

        return true;
    };
})(require('../pawn_parser'));
