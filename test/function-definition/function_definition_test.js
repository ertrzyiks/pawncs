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
});
