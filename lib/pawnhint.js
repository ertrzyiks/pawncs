var tokenize = require('pawn-tokenizer').tokenize,
    Transform = require('stream').Transform,
    Stately = require('stately.js'),
    fsm = require('./fsm'),
    util = require('util'),
    SourceTransform,
    parseStream;

SourceTransform = exports.SourceTransform = function (options) {
    "use strict";

    Transform.call(this, { objectMode: true });

    this.machine = Stately.machine(fsm, 'PROGRAM');
};

util.inherits(SourceTransform, Transform);

SourceTransform.prototype._transform = function (token, encoding, callback) {
    "use strict";

    var self = this;

    process.nextTick(function () {
        self.pushToken(token, callback);
    });
};

SourceTransform.prototype._flush = function (callback) {
    "use strict";

    var self = this;

    process.nextTick(function () {
        self.emit('data', self.machine);

        callback();
    });
};

SourceTransform.prototype.pushToken = function (token, done) {
    "use strict";

    var method = this.machine[this.machine.getMachineState() + ":" + token.type];

    try {
        if ('undefined' === typeof method) {
            throw "Unexepected token " + token.type;
        }

        method.call(this.machine, token);
        done();
    } catch (e) {
        done(e);
    }
};

parseStream = exports.parseStream = function (stream) {
    "use strict";

    var tk = tokenize();

    tk.on('data', function (chunk) {});

    return stream
        .pipe(tk)
        .pipe(new SourceTransform())
        .on('end', function (err) {
        });
};
