/* =================================================================================
 * @author Vladimir Polyakov
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var http = require("http");
var os = require('os');

var Browsermob = function (config) {
    this.lockFile = os.tmpdir() + '/BrowsermobLockFile';
    this.proxyPath = require('browsermob-standalone')();
    this.keepAlive = config.get('webdriver:keep_alive');
    this.proxyPort = config.get('webdriver:proxy_port');

    console.log('Ensuring working servers...');
    this.hasRun = false;

    process.on('exit', function () {
        if (this.proxy) {
            this.proxy.kill('SIGTERM');
            this.proxy = null;
            console.log('browsermob server stopped');
        }
    }.bind(this))

}

Browsermob.prototype = {
    start: function (callback) {
        if (this.keepAlive) {
            if (this.hasRun) return callback();
            this.spawnAsDedicatedProcess(callback);
        } else {
            if (this.hasRun) return callback();
            this.spawnAsControledProcess(callback);
        }
    },

    stop: function (callback) {
        this.isRun(function (err, started) {
            if (started) {
                if (this.getPid()) {
                    process.kill(this.getPid(), 'SIGINT');
                    console.log('browsermob server stopped');
                }
                callback();
            } else {
                console.log(err.message);
                callback();
            }
        }.bind(this));
    },

    getPid: function () {
        if (fs.existsSync(this.lockFile)) {
            return fs.readFileSync(this.lockFile, "utf8").trim();
        }
    },

    isRun: function (callback) {
        http.get('http://localhost:' + this.proxyPort + '/proxy', function () {
            this.hasRun = true;
            callback(null, true);
        }.bind(this)).on('error', function () {
            this.hasRun = false;
            callback(new Error('Selenium server not started'), false);
        }.bind(this));
    },

    spawnAsDedicatedProcess: function (callback) {
        this.isRun(function (err, started) {
            if (started) {
                return callback();
            } else {
                var proxy = spawn('java', ['-jar', this.proxyPath, '-port', this.proxyPort], {
                    detached: true,
                    stdio: 'pipe'
                });

                fs.writeFileSync(this.lockFile, proxy.pid);

                proxy.stdout.on('data', function (data) {
                    if (data.toString().indexOf('Started SelectChannelConnector') > -1) {
                        console.log('browsermob server started');

                        this.hasRun = true;
                        callback();
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    spawnAsControledProcess: function (callback) {
        this.proxy = spawn('java', ['-jar', this.proxyPath, '-port', this.proxyPort], {stdio: 'pipe'});

        this.proxy.stdout.on('data', function (data) {
            if (data.toString().indexOf('Started SelectChannelConnector') > -1) {
                console.log('browsermob server started');

                this.hasRun = true;
                callback();
            }
        }.bind(this));
    }
}

module.exports = Browsermob;

module.exports.$inject = ['config'];