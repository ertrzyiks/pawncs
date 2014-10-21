var tokenize = require('pawn-tokenizer').tokenize,
    Parser = require('parser'),
    util = require('util');

module.exports = PawnParser;

function PawnParser() {
    'use strict';

    Parser.call(this, tokenize());
    this.defaultHandler(this.program);
}

util.inherits(PawnParser, Parser);

PawnParser.prototype.program = function (token, type, next) {
    'use strict';

    switch (type) {
        case 'whitespace':
            break;

        case 'directive':
            next(this.directive);
            return true;

        default:
            throw "Unexpected " + type + " " + token.content;
    }

    throw "Unexpected " + type + " " + token.content;
};

PawnParser.prototype.directive = function (token, type, next) {
    switch (token.content) {
        case '#include':
            next(this.directiveInclude);
            break;

        default:
            throw "Unexpected " + type + " " + token.content;
    }
};

PawnParser.prototype.directiveInclude = function (token, type, next) {
    'use strict';

    switch (type) {
        case 'whitespace':

            break;

        case 'directive':
            next(this.directive);
            break;
    }

    throw "Unexpected " + type + " " + token.content;
};
