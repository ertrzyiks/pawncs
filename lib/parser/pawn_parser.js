(function (module) {
    'use strict';

    var tokenize = require('pawn-tokenizer').tokenize,
        Parser = require('parser'),
        util = require('util'),
        tree = require('../treehugger/tree');

    module.exports = PawnParser;

    function PawnParser() {
        Parser.call(this, tokenize(function () {}));

        this.nodes = [];

        this.startNode(null);
        this.defaultHandler(this.program);
    }

    util.inherits(PawnParser, Parser);

    PawnParser.prototype.getAstRoot = function () {
        return tree.cons('Root', this.nodes);
    };

    PawnParser.prototype.startNode = function (name) {
        this.currentNode = name;
        this.currentArguments = [];
        this.currentAnnotations = {};
    };

    PawnParser.prototype.pushNodeArgument = function (name, content) {
        var node = tree.cons(name, [tree.string(content)]);
        this.currentArguments.push(node);
    };

    PawnParser.prototype.construct = function (token, type, next) {
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

    PawnParser.prototype.program = function (token, type, next) {
        switch (type) {
            case 'whitespace':
                next(this.program);
                break;

            case 'directive':
                next(this.directive);
                return true;

            case 'identifier':
                next(this.functionDefinition);
                return true;

            case 'eof':
                break;

            default:
                throw 'Unexpected ' + type + ' ' + token.content;
        }
    };
})(module);
