/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var LoggerInitializer = function (config, options) {

    if (options.get('debug')) {
        config.set('logger:level', 'debug');
    } else {
        if (!options.isCli()) {
            config.set('logger:level', 'error');
        }
    }

};

module.exports = LoggerInitializer;

module.exports.$inject = ['config', 'Options'];
module.exports.$tags = ['garden.js', 'module'];