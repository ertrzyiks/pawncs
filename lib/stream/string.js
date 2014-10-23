(function (module) {
    'use strict';

    var util = require('util'),
        Readable = require('stream').Readable;

    module.exports = StringStream;

    function StringStream(source) {
        this.source = source;

        Readable.apply(this, arguments);
    }

    util.inherits(StringStream, Readable);

    StringStream.prototype._read = function () {
        this.push(this.source);
        this.push(null);
    };
})(module);
