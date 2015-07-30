/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandFixturesLoad = function (loader, logger) {

    this.run = function () {
        loader.reload();
        logger.info('done');
    }

}

module.exports = CommandFixturesLoad;
module.exports.$inject = ['FixtureLoader', 'Logger'];
