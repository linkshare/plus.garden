/* =================================================================================
 * @author Vladimir Polyakov
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var browsermobProxy = require('browsermob-proxy').Proxy;

var Proxy = function (config) {
    this.proxyPort = config.get('webdriver:proxy_port');
    this.proxy = new browsermobProxy({ port: this.proxyPort });

}

Proxy.prototype = {
    connectToProxy: function (callback) {
        this.proxy.start(function (err, data) {
            if (err) {
                console.log(err);
            }
            this.port = data.port;
            callback(err, data)
        }.bind(this));
    },

    proxyDisconnect: function (callback) {
        this.proxy.stop(this.port, function () {
            callback();
        });
    },

    startCollectInfo: function (captureHeaders, captureContent, captureBinaryContent, callback) {
        this.proxy.startHAR(this.port, null, captureHeaders, captureContent, captureBinaryContent, function () {
            callback();
        })
    },

    remapHosts: function (hosts, callback) {
        this.proxy.remapHosts(this.port, hosts, function () {
            callback();
        })
    },

    addHeaders: function (headers, callback) {
        this.proxy.addHeader(this.port, headers, function () {
            callback();
        })
    },

    getPort: function () {
        return this.port;
    },

    getStatusByUrl: function (url, callback) {
        this.proxy.getHAR(this.port, function (err, resp) {
            if (!err) {
                var result = false;
                var foundEntire = null;
                var response = JSON.parse(resp);
                var responseArray = response.log.entries.reverse();
                responseArray.forEach(function (entire) {
                    if (entire.request.url == url) {
                        foundEntire = entire;
                        result = true;
                    }
                });
                if (result) {
                    callback(null, foundEntire.response.status);
                } else {
                    callback(new Error('Url "'+url+'" wasn\'t found on proxy. Probably page wasn\'t loaded'));
                }
            } else {
                callback(new Error('Error getting HAR file: ' + err));
            }
        });
    },

    getMetaByUrl: function (url, callback) {
        this.proxy.getHAR(this.port, function (err, resp) {
            if (!err) {
                var result = false;
                var foundEntire = null;
                var response = JSON.parse(resp);
                var responseArray = response.log.entries.reverse();
                responseArray.forEach(function (entire) {
                    if (entire.request.url == url) {
                        foundEntire = entire;
                        result = true;
                    }
                });
                if (result) {
                    callback(null, foundEntire);
                } else {
                    callback(new Error('Url "'+url+'" wasn\'t found on proxy. Probably page wasn\'t loaded'));
                }
            } else {
                callback(new Error('Error getting HAR file: ' + err));
            }
        });
    }

}

module.exports = Proxy;

module.exports.$inject = ['config'];