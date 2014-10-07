module.exports = (function () {
    "use strict";

    return {
        PROGRAM: {
            'PROGRAM:comment': 'PROGRAM',
            'PROGRAM:directive': function (token) {
                switch (token.content) {
                    case '#include':
                        return this.DIRECTIVE_INCLUDE;

                    case '#pragma':
                        return this.DIRECTIVE_PRAGMA;

                    case '#define':
                        return this.DIRECTIVE_DEFINE;
                }

                throw "Unknown directive " + token.content;
            },
            'PROGRAM:keyword': 'PROGRAM',
            'PROGRAM:whitespace': 'PROGRAM',
            'PROGRAM:operator': 'PROGRAM',
            'PROGRAM:open paren': 'PROGRAM',
            'PROGRAM:close paren': 'PROGRAM',
            'PROGRAM:open curly': 'PROGRAM',
            'PROGRAM:close curly': 'PROGRAM',
            'PROGRAM:identifier': 'PROGRAM'
        }
    };
})();
