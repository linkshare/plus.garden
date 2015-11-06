module.exports = function (container, next) {

    var EnvironmentService = container.get('EnvironmentService');
    var BrowserConfig = container.get('Webdriver.Browser.Config');

    var Selenium = container.get('Selenium');
    var logger = container.get('Logger');
    var config = container.get('config');

    var browser = BrowserConfig.getParameter('browser');

    if (browser == 'phantomjs') {
        var phantomBin = Selenium.phantomjsPath + '/phantomjs ';
        var cmd = phantomBin + config.get('garden_dir') + '/app/environment/tests/phantomjs_scenario.js';
        EnvironmentService.testBin(cmd, /phantomjs_ok/ig, function (err, ok) {
            if (!ok) {
                logger.error('Phantomjs works incorrect please take a look docs: http://phantomjs.org/');
                next(new Error('Phantomjs works incorrect'));
            } else {
                next();
            }
        });
    } else {
        next();
    }
};