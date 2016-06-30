var _ = require('lodash-node');
var keysTests = require('./keysModule.js');

_.each(keysTests, function (test) {
    test();    
});




