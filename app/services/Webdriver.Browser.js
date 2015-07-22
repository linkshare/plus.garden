var Browser = function (config, Browsermob, Selenium, Proxy, logger, options) {

    var self = this;

    this.config = config;
    var host = this.config.get('host');

    this.webdriver = require('selenium-webdriver');
    this.wdproxy = require('selenium-webdriver/proxy');

    this.proxy = Proxy;

    this.connectToBrowser = function (callback) {

        var browser = this.getParameter('browser');

        var capabilities = this.getParameter('capabilities:' + browser);

        var proxyHost = this.getParameter('proxy_host');
        var serverHost = this.getParameter('server_host');
        var serverPort = this.getParameter('server_port');

        this.driver = new this.webdriver.Builder().
            withCapabilities(capabilities).
            setProxy(this.wdproxy.manual({
                http: proxyHost + ':' + self.proxy.getPort(),
                https: proxyHost + ':' + self.proxy.getPort()
            })).
            usingServer('http://' + serverHost + ':' + serverPort + '/wd/hub').
            build();

        this.$ = require('../lib/WebdriverSizzle')(this.driver, this.webdriver);
        this.Browser = require('chainit')(require('../lib/WebdriverBrowser'));
        this.browser = new this.Browser(this.driver, this.$, logger,
            {
                proxy: this.proxy,
                host: host,
                waitTimeout: this.getParameter('waitTimeout')
            });

        callback();
    };

    this.then = function (next) {

        Browsermob.start(function () {
            Selenium.start(function () {
                self.proxy.connectToProxy(function () {
                    self.connectToBrowser(function () {
                        next(self);
                    });
                })
            });
        });
    }


    var remapHosts = config.get('webdirver:proxy_remap_hosts');

    this.before = function (next) {

        var screenResolution = self.getParameter('screen_resolution');
        var screenWidth = parseInt(screenResolution.match(/^\d+/)[0]);
        var screenHeight = parseInt(screenResolution.match(/\d+$/)[0]);

        this.driver.manage().window().setSize(screenWidth, screenHeight);
        this.proxyStartCollectInfo(null, null, null, next)
    }

    this.after = function (next) {
        this.proxy.proxyDisconnect(function () {
            this.driver.quit().then(next);
        }.bind(this));
    }

    this.proxyStartCollectInfo = function (captureHeaders, captureContent, captureBinaryContent, next) {
        this.proxy.startCollectInfo(captureHeaders, captureContent, captureBinaryContent, function () {
            this.proxy.remapHosts(remapHosts, next);
        }.bind(this));
    }

    this.addHeaders = function (headers, next) {
        this.proxy.addHeaders(headers, next);
    }


    this.getParameter = function (name) {
        var profile = config.get('webdirver:profile_name');
        var parameter = config.get('webdirver:profile:' + profile + ':' + name);

        return parameter || config.get('webdirver:' + name);
    }

    this.setParameter = function (name, value) {
        var profile = config.get('webdirver:profile_name');
        config.set('webdirver:profile:' + profile + ':' + name, value);
        config.set('webdirver:' + name, value);
    }

    this.init = function () {

        if (options.get('profile')) {
            this.setParameter('profile_name', options.get('profile'));
        }

        if (options.get('browser')) {
            this.setParameter('browser', options.get('browser'));
        }

    }

    this.init();

}

var BrowserFactory = function (config, Browsermob, Selenium, Proxy, logger, options) {
    return {
        create: function (next) {
            new Browser(config, Browsermob, Selenium, Proxy, logger, options).then(next);
        }
    }
}

module.exports = BrowserFactory;
module.exports.$inject = ['config', 'Browsermob', 'Selenium', 'Proxy', 'Logger', 'Options'];