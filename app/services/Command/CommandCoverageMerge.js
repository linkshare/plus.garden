/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandCoverageMerge = function (command) {

    var wait = require('wait.for');

    this.run = function (reporter) {
        var reporter = reporter ? reporter : '';
        var cmd = './node_modules/.bin/istanbul report ' + reporter;
        wait.forMethod(command, 'run', cmd);
    }

}

module.exports = CommandCoverageMerge;
module.exports.$inject = ['Command'];
