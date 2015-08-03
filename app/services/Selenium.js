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

var Selenium = function (config) {
    this.lockFile = os.tmpdir() + '/SeleniumLockFile';
    this.seleniumPath = require('plus.garden.selenium-standalone').getServerPath();
    this.phantomjsPath = config.get('garden_dir') + '/node_modules/phantomjs/bin';
    this.chromePath = require('plus.garden.selenium-standalone').getChromeDriverPath();

    this.env = process.env;
    this.env.PATH += ':' + this.phantomjsPath;
    this.env.PATH += ':' + this.chromePath;

    this.hasRun = false;
    this.keepAlive = config.get('webdriver:keep_alive');

    process.on('exit', function () {
        if (this.selenium) {
            this.selenium.kill('SIGTERM');
            this.selenium = null;
            console.log('selenium server stopped');
        }
    }.bind(this))

}

Selenium.prototype = {
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
                    console.log('Selenium server stopped');
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
        http.get("http://127.0.0.1:4444/wd/hub", function () {
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
                var selenium = spawn('java', ['-jar', this.seleniumPath],
                    {
                        detached: true,
                        stdio: 'pipe',
                        env: this.env
                    });

                fs.writeFileSync(this.lockFile, selenium.pid);

                selenium.stderr.on('data', function (data) {
                    if (data.toString().indexOf('Selenium Server is up and running') > -1) {
                        console.log('selenium server started');

                        this.hasRun = true;
                        callback();
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    spawnAsControledProcess: function (callback) {
        this.selenium = spawn('java', ['-jar', this.seleniumPath],
            {
                stdio: 'pipe',
                env: this.env
            });

        this.selenium.stderr.on('data', function (data) {
            if (data.toString().indexOf('Selenium Server is up and running') > -1) {
                console.log('selenium server started');

                this.hasRun = true;
                callback();
            }
        }.bind(this));
    }
}

module.exports = Selenium;

module.exports.$inject = ['config'];