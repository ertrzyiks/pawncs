(function () {
    'use strict';

    var tree = require('../../treehugger/tree'),
        PawnParser = require('../pawn_parser');

    PawnParser.prototype.directiveTryInclude = function (token, type, next) {
        switch (type) {
            case 'identifier':
                this.currentArguments.push(tree.cons('Identifier', [tree.string(token.content)]));

                if (this.currentAnnotations.operator) {
                    next(this.directiveTryInclude);
                    break;
                }

                next(this.construct);
                break;

            case 'quote':
                this.currentArguments.push(tree.cons('Quote', [tree.string(token.content)]));
                next(this.construct);
                break;

            case 'whitespace':
                this.currentArguments.push(tree.cons('Whitespace', [tree.string(token.content)]));
                next(this.directiveTryInclude);
                break;

            case 'operator':
                if (token.content === '<') {
                    this.currentArguments.push(tree.cons('Operator', [tree.string(token.content)]));
                    this.currentAnnotations.operator = true;
                    next(this.directiveTryInclude);
                } else if (token.content === '>') {
                    this.currentArguments.push(tree.cons('Operator', [tree.string(token.content)]));
                    next(this.construct);
                } else {
                    throw "Unexpected " + type + " " + token.content;
                }
                break;

            case 'directive':
                this.currentNode = 'TryInclude';
                this.currentArguments = [];
                this.currentAnnotations = {};

                next(this.directiveTryInclude);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }
    };
})();
