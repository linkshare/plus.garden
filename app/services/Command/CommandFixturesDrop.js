/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandFixturesDrop = function (loader, logger) {

    this.run = function () {
        loader.drop();
        logger.info('done');
    }

}

module.exports = CommandFixturesDrop;
module.exports.$inject = ['FixtureLoader', 'Logger'];
