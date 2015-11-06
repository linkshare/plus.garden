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
    container.register('CommandUnitTest', require('../services/Command/CommandUnitTest'));
    container.register('LoadTest', require('../services/LoadTest'));
    container.register('CommandLoadTest', require('../services/Command/CommandLoadTest'));

    container.register('CommandCoverageMerge', require('../services/Command/CommandCoverageMerge'));
    container.register('CommandCoverageRemove', require('../services/Command/CommandCoverageRemove'));
    container.register('CommandInit', require('../services/Command/CommandInit'));

    container.register('Browsermob', require('../services/BrowserMob'));
    container.register('Selenium', require('../services/Selenium'));
    container.register('Proxy', require('../services/Proxy'));
    container.register('CommandWebDriver', require('../services/Command/CommandWebDriver'));

    container.register('Webdriver.Browser', require('../services/Webdriver.Browser'));
    container.register('Webdriver.Browser.Config', require('../services/Webdriver.Browser.Config'));

    container.register('LoggerInitializer', require('../services/LoggerInitializer'));
    container.register('EnvironmentService', require('../services/EnvironmentService'));

}

