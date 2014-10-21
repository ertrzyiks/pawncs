var assert = require("assert"),
    path = require("path"),
    fs = require("fs"),
    PawnParser = require("../lib/pawncs.js");

describe('Pawncs', function(){
    describe('#parseStream', function(){
        it('should emit data event', function(done){
            var stream = fs.createReadStream(path.join(__dirname, "fixtures/source.sma"));

            var p = new PawnParser();

            stream.on('data', function(data) {
                p.write(data);
            });
            stream.on('end', function() {
                p.end();
            });
        })
    })
});
