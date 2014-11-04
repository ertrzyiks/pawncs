(function () {
    'use strict';

    var tree = require('../../treehugger/tree'),
        PawnParser = require('../pawn_parser');

    PawnParser.prototype.directiveTryInclude = function (token, type, next) {
        switch (type) {
            case 'identifier':
                this.pushNodeArgument('Identifier', token.content);

                if (this.currentAnnotations.operator) {
                    next(this.directiveTryInclude);
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
                next(this.directiveTryInclude);
                break;

            case 'operator':
                if (token.content === '<') {
                    this.pushNodeArgument('Operator', token.content);
                    this.currentAnnotations.operator = true;
                    next(this.directiveTryInclude);
                } else if (token.content === '>') {
                    this.pushNodeArgument('Operator', token.content);
                    next(this.construct);
                } else {
                    throw "Unexpected " + type + " " + token.content;
                }
                break;

            case 'directive':
                this.startNode('TryInclude');

                next(this.directiveTryInclude);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }
    };
})();
