(function (PawnParser) {
    'use strict';

    require('./scoped');

    PawnParser.prototype.functionDefinition = function (token, type, next) {
        switch (type) {
            case 'identifier':
                this.startNode('FunctionDefinition', token.content);
                this.pushNodeArgument('Identifier', token.content);
                next(this.functionDefinition);
                break;

            case 'whitespace':
                this.pushNodeArgument('Whitespace', token.content);
                next(this.functionDefinition);
                break;

            case 'open paren':
                this.pushNodeArgument('OpenParen', token.content);
                next(this.functionDefinition);
                break;

            case 'close paren':
                this.pushNodeArgument('CloseParen', token.content);
                next(this.functionDefinition);
                break;

            case 'open curly':
                this.pushNodeArgument('OpenCurly', token.content);
                next(this.functionDefinition);
                break;

            case 'close curly':
                this.pushNodeArgument('CloseCurly', token.content);
                next(this.construct);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }
    };
})(require('../pawn_parser'));
