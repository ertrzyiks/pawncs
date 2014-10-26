var expect = require('chai').expect,
    path = require('path'),
    pawncs = require('../../lib');

describe('Directive Include', function(){
    it('should parse include with operators', function(done){
        pawncs.parseString('#tryinclude <amxmodx>', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('TryInclude');
            expect(node.getAnnotation('operator')).to.equal(true);

            expect(node).to.have.length(4);

            expect(node[0].cons).to.equal('Whitespace');
            expect(node[1].cons).to.equal('Operator');
            expect(node[2].cons).to.equal('Identifier');
            expect(node[3].cons).to.equal('Operator');

            done();
        });
    });

    it('should parse include with operators with whitespaces', function(done){
        pawncs.parseString('#tryinclude < amxmodx >', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('TryInclude');
            expect(node.getAnnotation('operator')).to.equal(true);

            expect(node).to.have.length(6);

            expect(node[0].cons).to.equal('Whitespace');
            expect(node[1].cons).to.equal('Operator');
            expect(node[2].cons).to.equal('Whitespace');
            expect(node[3].cons).to.equal('Identifier');
            expect(node[4].cons).to.equal('Whitespace');
            expect(node[5].cons).to.equal('Operator');

            done();
        });
    });

    it('should parse include with path in quote', function(done){
        pawncs.parseString('#tryinclude "amxmodx"', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('TryInclude');

            expect(node).to.have.length(2);

            expect(node[0].cons).to.equal('Whitespace');
            expect(node[1].cons).to.equal('Quote');

            done();
        });
    });

    it('should parse include with just identifier', function(done){
        pawncs.parseString('#tryinclude amxmodx', function (err, root) {
            expect(err).to.be.null;

            expect(root).to.have.length(1);

            var node = root[0];
            expect(node.cons).to.equal('TryInclude');

            expect(node).to.have.length(2);

            expect(node[0].cons).to.equal('Whitespace');
            expect(node[1].cons).to.equal('Identifier');

            done();
        });
    });

    it('should report error invalid token occured', function(done){
        pawncs.parseString('#tryinclude +', function (err, root) {
            expect(err).to.equal('Unexpected operator +');

            done();
        });
    });
});
