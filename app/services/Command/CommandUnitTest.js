/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandUnitTest = function (command, commander, logger, commandCoverageMerge) {

    var wait = require('wait.for');

    function merge() {
        if (commander.merge) {
            logger.info('Merging coverage..');
            commandCoverageMerge.run();
            logger.info('done');
        }
    }

    this.run = function (name) {

            var name = name ? name : 'tests';
            var args = '--colors --reporter=spec --require=./tests/context.js --recursive ' + name;

            var handler = './node_modules/.bin/mocha ';

            if(commander.coverage)
            {
                handler = './node_modules/.bin/istanbul cover --dir ./coverage/unit -x **/garden/** --root=.. ./node_modules/.bin/_mocha -- ';
            }

            var cmd = handler + args;

            wait.forMethod(command, 'run', cmd);

            merge();
    }

}

module.exports = CommandUnitTest;
module.exports.$inject = ['Command', 'Commander', 'Logger', 'CommandCoverageMerge'];
