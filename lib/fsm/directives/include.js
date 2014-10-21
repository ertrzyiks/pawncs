/**
 *
 */
module.exports = (function () {
    "use strict";

    return {
        DIRECTIVE_INCLUDE: {
            'DIRECTIVE_INCLUDE:whitespace': function () {
                console.log(this);
                return this.DIRECTIVE_INCLUDE;
            },
            'DIRECTIVE_INCLUDE:operator': 'PROGRAM',
            'DIRECTIVE_INCLUDE:identifier': 'PROGRAM',
            'DIRECTIVE_INCLUDE:quote': 'PROGRAM'
        },

        onenter: function (event, oldState, newState) {
            this[newState]._tokens = [];
        }
    };
})();
