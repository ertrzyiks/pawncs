var expect = require('chai').expect,
    path = require('path'),
    pawncs = require('../../lib');

describe('Function definition', function() {
    it('should parse function definition', function (done) {
        pawncs.parseString('test(){}', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('FunctionDefinition');
            expect(node[0].toString()).to.equal('Identifier("test")');
            expect(node[1].cons).to.equal('OpenParen');
            expect(node[2].cons).to.equal('CloseParen');
            expect(node[3].cons).to.equal('OpenCurly');
            expect(node[4].cons).to.equal('CloseCurly');

            done();
        });
    });

    it('should parse function definition with whitespaces', function (done) {
        pawncs.parseString('test () {}', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('FunctionDefinition');
            expect(node[0].toString()).to.equal('Identifier("test")');
            expect(node[1].cons).to.equal('Whitespace');
            expect(node[2].cons).to.equal('OpenParen');
            expect(node[3].cons).to.equal('CloseParen');
            expect(node[4].cons).to.equal('Whitespace');
            expect(node[5].cons).to.equal('OpenCurly');
            expect(node[6].cons).to.equal('CloseCurly');

            done();
        });
    });

    it('should parse parametrized function definition', function (done) {
        pawncs.parseString('test(a,b){}', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('FunctionDefinition');
            expect(node[0].toString()).to.equal('Identifier("test")');
            expect(node[1].cons).to.equal('OpenParen');
            expect(node[2].toString()).to.equal('Identifier("a")');
            expect(node[3].cons).to.equal('Operator');
            expect(node[4].toString()).to.equal('Identifier("b")');
            expect(node[5].cons).to.equal('CloseParen');
            expect(node[6].cons).to.equal('OpenCurly');
            expect(node[7].cons).to.equal('CloseCurly');

            done();
        });
    });

    it('should parse stock function definition', function (done) {
        pawncs.parseString('stock test(){}', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];

            expect(node.cons).to.equal('FunctionDefinition');
            expect(node[0].cons).to.equal('KeywordStock');
            expect(node[1].cons).to.equal('Whitespace');
            expect(node[2].toString()).to.equal('Identifier("test")');
            expect(node[3].cons).to.equal('OpenParen');
            expect(node[4].cons).to.equal('CloseParen');
            expect(node[5].cons).to.equal('OpenCurly');
            expect(node[6].cons).to.equal('CloseCurly');

            done();
        });
    });

    it('should parse public function definition', function (done) {
        pawncs.parseString('public test(){}', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('FunctionDefinition');
            expect(node[0].cons).to.equal('KeywordPublic');
            expect(node[1].cons).to.equal('Whitespace');
            expect(node[2].toString()).to.equal('Identifier("test")');
            expect(node[3].cons).to.equal('OpenParen');
            expect(node[4].cons).to.equal('CloseParen');
            expect(node[5].cons).to.equal('OpenCurly');
            expect(node[6].cons).to.equal('CloseCurly');

            done();
        });
    });
});
