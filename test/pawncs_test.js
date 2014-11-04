var expect = require("chai").expect,
    path = require("path"),
    fs = require("fs"),
    pawncs = require("../lib");

describe('Pawncs', function (){
    describe('#PawnParse', function (){
        it('should be a class', function () {
            expect(pawncs.PawnParser).to.be.a('function');
        });
    });

    describe('#parseFile', function (){
        it('should be a function', function () {
            expect(pawncs.parseFile).to.be.a('function');
        });
    });

    describe('#parseStream', function (){
        it('should be a function', function () {
            expect(pawncs.parseFile).to.be.a('function');
        });
    });

    describe('#parseString', function (){
        it('should be a function', function () {
            expect(pawncs.parseString).to.be.a('function');
        });
    });
});
