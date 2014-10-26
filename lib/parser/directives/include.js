(function () {
    'use strict';

    var tree = require('../../treehugger/tree'),
        PawnParser = require('../pawn_parser');

    PawnParser.prototype.directiveInclude = function (token, type, next) {
        switch (type) {
            case 'identifier':
                this.currentArguments.push(tree.cons('Identifier', [tree.string(token.content)]));

                if (this.currentAnnotations.operator) {
                    next(this.directiveInclude);
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
                next(this.directiveInclude);
                break;

            case 'operator':
                if (token.content === '<') {
                    this.currentArguments.push(tree.cons('Operator', [tree.string(token.content)]));
                    this.currentAnnotations.operator = true;
                    next(this.directiveInclude);
                } else if (token.content === '>') {
                    this.currentArguments.push(tree.cons('Operator', [tree.string(token.content)]));
                    next(this.construct);
                } else {
                    throw "Unexpected " + type + " " + token.content;
                }
                break;

            case 'directive':
                this.currentNode = 'Include';
                this.currentArguments = [];
                this.currentAnnotations = {};

                next(this.directiveInclude);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }
    };
})();
