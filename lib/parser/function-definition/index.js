(function (PawnParser) {
    'use strict';

    require('./scoped');

    PawnParser.prototype.functionDefinition = function (token, type, next) {
        switch (type) {
            case 'identifier':
                if ('FunctionDefinition' !== this.getCurrentNode()) {
                    this.startNode('FunctionDefinition', token.content);
                }

                this.pushNodeArgument('Identifier', token.content);
                next(this.functionDefinition);
                break;

            case 'keyword':
                next(this.functionDefinitionKeyword);
                return true;

            case 'whitespace':
                this.pushNodeArgument('Whitespace', token.content);
                next(this.functionDefinition);
                break;

            case 'operator':
                next(this.functionDefinitionOperator);
                return true;

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

    PawnParser.prototype.functionDefinitionKeyword = function (token, type, next) {
        switch (token.content) {
            case 'stock':
                this.startNode('FunctionDefinition', token.content);
                this.pushNodeArgument('KeywordStock', token.content);
                break;

            case 'public':
                this.startNode('FunctionDefinition', token.content);
                this.pushNodeArgument('KeywordPublic', token.content);
                break;

            default:
                throw "Unexpected " + type + " " + token.content;
        }

        next(this.functionDefinition);
    };

    PawnParser.prototype.functionDefinitionOperator = function (token, type, next) {
        switch (token.content) {
            case ',':
                this.pushNodeArgument('Operator', token.content);
                next(this.functionDefinition);
                break;
        }
    };
})(require('../pawn_parser'));
