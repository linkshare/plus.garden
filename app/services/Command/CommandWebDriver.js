/* =================================================================================
 * @author Vladimir Polyakov
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandWebDriver = function (config, logger, browsermob, selenium) {

    var wait = require('wait.for');

    this.start = function (action) {
        if (config.get('webdriver:keep_alive')) {
            wait.forMethod(browsermob, "start");
            wait.forMethod(selenium, "start");
            logger.info('servers is started');
        } else {
            logger.error('webdriver:keep_alive parameter should be "true"');
        }
    };

    this.stop = function (action) {
        wait.forMethod(browsermob, "stop");
        wait.forMethod(selenium, "stop");
    }

}

module.exports = CommandWebDriver;
module.exports.$inject = ["config", 'Logger', 'Browsermob', 'Selenium'];
