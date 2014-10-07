/*var Stately = require("stately.js"),
    pawnTokenizer = require("pawn-tokenizer"),
    fsm;

fsm = Stately.machine({
    'S1': {
        '0': function () {
            console.log(arguments);
            return this.S2;
        },
        '1': 'S1'
    },
    'S2': {
        '0': 'S1',
        '1': 'S0'
    }
});

fsm[0].call();
*/
