var tokenize = require('pawn-tokenizer').tokenize,
    Parser = require('parser'),
    util = require('util'),
    tree = require('../treehugger/tree');

module.exports = PawnParser;

function PawnParser() {
    'use strict';

    Parser.call(this, tokenize(function () {}));

    this.nodes = [];

    this.currentNode = null;
    this.currentArguments = [];
    this.currentAnnotations = {};

    this.defaultHandler(this.program);
}

util.inherits(PawnParser, Parser);

PawnParser.prototype.getAstRoot = function () {
    'use strict';

    return tree.cons('Root', this.nodes);
};

PawnParser.prototype.program = function (token, type, next) {
    'use strict';

    switch (type) {
        case 'whitespace':
            next(this.program);
            break;

        case 'directive':
            next(this.directive);
            return true;

        case 'eof':
            break;

        default:
            throw 'Unexpected ' + type + ' ' + token.content;
    }
};

PawnParser.prototype.construct = function (token, type, next) {
    'use strict';

    var node = tree.cons(this.currentNode, this.currentArguments);

    for (var name in this.currentAnnotations) {
        if (this.currentAnnotations.hasOwnProperty(name)) {
            node.setAnnotation(name, this.currentAnnotations[name]);
        }
    }

    this.nodes.push(node);

    next(this.program);
    return true;
};

PawnParser.prototype.directive = function (token, type, next) {
    'use strict';

    switch (token.content) {
        case '#include':
            next(this.directiveInclude);
            break;

        default:
            throw "Unexpected " + type + " " + token.content;
    }

    return true;
};

PawnParser.prototype.directiveInclude = function (token, type, next) {
    'use strict';

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
