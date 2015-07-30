/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var Garden = function (dir, env, options) {

    var path = require('path');

    this.wait = require('wait.for');
    this.dir = dir || process.cwd();
    this.garden_dir = Garden.getDir();

    this.env = env || process.env.NODE_ENV || 'test';

    var dir = path.resolve(this.dir);

    var gardenConfigDir = this.garden_dir + '/app/config';

    var Application = require('plus.application');

    this.dirs = [gardenConfigDir, this.dir];

    this.app = new Application({
        env: this.env,
        dir: this.dirs
    });

    this.app.config.fill(options || {});

    // Container
    var config = this.app.config;

    // Set dirs
    config.set('root_dir', dir);
    config.set('garden_dir', this.garden_dir);
    config.set('config_dir', this.dir);

    // Service getter
    this.get = function (name) {
        return this.app.get(name);
    };

    // Service setter
    this.set = function (name, value) {
        return this.app.set(name, value);
    };

    this.reloadAppConfig = function () {
        this.app.config.load({dir: this.dir, env: this.env});
    }

    this.load = function (options) {
        options.env = this.env;
        this.app.load(options);
        this.reloadAppConfig();
    }

    this.init = function () {

        this.set('Garden', this);

        this.app.container.find(['garden.js', 'module']);

        if(this.get('Options').isCli())
        {
            this.app.container.find(['garden.js', 'cli']);
            // setup commands
            require('../../app/config/routes')(this);
        }

        return this;
    }

};

Garden.getDir = function () {
    var path = require('path');
    return path.resolve(__dirname + '/../../');
}

Garden.wait = require('wait.for');
Garden.sinon = require('sinon');
Garden.chai = require('chai');
Garden.request = require('request');

module.exports = Garden;