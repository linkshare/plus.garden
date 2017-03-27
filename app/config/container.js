/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

module.exports = function (container) {

    container.register('Options', require('../services/Options'));
    container.register('Logger', require('../services/Logger'));

    container.register('FixtureLoader', require('../services/FixtureLoader'));

    container.register('Command', require('../services/Command'));
    container.register('CommanderInfo', require('../services/CommanderInfo'));
    container.register('CommandFunctionalTest', require('../services/Command/CommandFunctionalTest'));

    container.register('LoggerInitializer', require('../services/LoggerInitializer'));

};

