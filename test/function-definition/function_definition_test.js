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

            done();
        });
    });
});
