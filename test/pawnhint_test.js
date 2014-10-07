var assert = require("assert"),
    path = require("path"),
    fs = require("fs"),
    parseStream = require("../lib/pawnhint.js").parseStream;

describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(done){
            var stream = fs.createReadStream(path.join(__dirname, "fixtures/source.sma"));

            parseStream(stream).on('data', function (machine) {
                done();
            });
        })
    })
});
