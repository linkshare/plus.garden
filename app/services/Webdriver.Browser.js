/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var Browser = function (config, BrowserConfig, Browsermob, Selenium, Proxy, logger, options, EnvironmentService) {

    var self = this;

    var async = require('async');

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

    this.testEnvironemnt = function (next) {
        EnvironmentService.test(['java', 'phantomjs'], function (err) {
            if (err) {
                logger.error('You have problems with test environment please take a look on errors');
            }

            next();
        });
    };

    this.then = function (next) {
        this.testEnvironemnt(function (err) {
            if (err) {
                logger.error('You have problems with test environment please take a look on errors');
            }


            Browsermob.start(function () {
                Selenium.start(function () {
                    self.proxy.connectToProxy(function () {
                        self.connectToBrowser(function () {
                            next(self);
                        });
                    })
                });
            });
        });
    };


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
        var remapHosts = self.getParameter('proxy_remap_hosts');

        this.proxy.startCollectInfo(captureHeaders, captureContent, captureBinaryContent, function () {
            this.proxy.remapHosts(remapHosts, next);
        }.bind(this));
    }

    this.addHeaders = function (headers, next) {
        this.proxy.addHeaders(headers, next);
    }


    this.getParameter = function (name) {
        return BrowserConfig.getParameter(name);
    }

    this.setParameter = function (name, value) {
        return BrowserConfig.setParameter(name, value);
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

var BrowserFactory = function (config, BrowserConfig, Browsermob, Selenium, Proxy, logger, options, EnvironmentService) {
    return {
        create: function (next) {
            new Browser(config, BrowserConfig, Browsermob, Selenium, Proxy, logger, options, EnvironmentService).then(next);
        }
    }
};

module.exports = BrowserFactory;
module.exports.$inject = ['config', 'Webdriver.Browser.Config', 'Browsermob', 'Selenium', 'Proxy', 'Logger', 'Options', 'EnvironmentService'];