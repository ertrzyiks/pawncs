(function (PawnParser) {
    'use strict';

    PawnParser.prototype.identifier = function (token, type, next) {
        switch (type) {
            case 'identifier':
                this.pushNodeArgument('Identifier', token.content);
                break;

            case 'operator':
                //next(this.identifierOperator);
                break;

            case 'whitespace':
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }

        return true;
    };

    PawnParser.prototype.identifierOperator = function (token, type, next) {};
})(require('../pawn_parser'));
