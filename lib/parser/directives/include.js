(function () {
    'use strict';

    var tree = require('../../treehugger/tree'),
        PawnParser = require('../pawn_parser');

    PawnParser.prototype.directiveInclude = function (token, type, next) {
        switch (type) {
            case 'identifier':
                this.pushNodeArgument('Identifier', token.content);

                if (this.currentAnnotations.operator) {
                    next(this.directiveInclude);
                    break;
                }

                next(this.construct);
                break;

            case 'quote':
                this.pushNodeArgument('Quote', token.content);
                next(this.construct);
                break;

            case 'whitespace':
                this.pushNodeArgument('Whitespace', token.content);
                next(this.directiveInclude);
                break;

            case 'operator':
                if (token.content === '<') {
                    this.pushNodeArgument('Operator', token.content);
                    this.currentAnnotations.operator = true;
                    next(this.directiveInclude);
                } else if (token.content === '>') {
                    this.pushNodeArgument('Operator', token.content);
                    next(this.construct);
                } else {
                    throw "Unexpected " + type + " " + token.content;
                }
                break;

            case 'directive':
                this.startNode('Include');

                next(this.directiveInclude);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }
    };
})();
