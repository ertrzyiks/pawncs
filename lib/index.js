(function (module) {
    'use strict';

    var fs = require('fs'),
        StringStream = require('./stream/string'),
        PawnParser = require('./parser');

    module.exports.PawnParser = PawnParser;

    function pipeParser(stream, parser) {
        stream.on('data', function (data) {
            parser.write(data);
        });

        stream.on('end', function () {
            parser.end();
        });
    }

    module.exports.parseStream = function (stream, done) {
        var p = new PawnParser(),
            alreadyDone = false;

        p.on('error', function (err) {
            done(err);

            alreadyDone = true;
        });

        p.on('end', function () {
            if (!alreadyDone) {
                done(null, p.getAstRoot());
            }
        });

        pipeParser(stream, p);
    };

    module.exports.parseFile = function (filepath, done) {
        var fileStream = fs.createReadStream(filepath);

        return module.exports.parseStream(fileStream, done);
    };

    module.exports.parseString = function (source, done) {
        var stringStream = new StringStream(source);

        return module.exports.parseStream(stringStream, done);
    };
})(module);
