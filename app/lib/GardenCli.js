#!/usr/bin/env node

/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var GardenCli = function (options) {

    var merge = require('merge');
    var path = require('path');

    var def = {
        root_dir: process.cwd()
    }

    options = options || {};

    merge(this, def, options);

    this.run = function () {

        var commander = require('commander');
        var Garden = require('./Garden');
        var wait = require('wait.for');

        wait.launchFiber(function () {

            commander
                .version(require(Garden.getDir() + '/package.json').version)
                .option('-e, --env <name>', 'environment: test, dev, ...')
                .option('-d, --debug', 'debug mode');

            commander.parse(process.argv);

            var garden = new Garden(this.root_dir, commander.env || 'test');

            // define commander as a service
            garden.set('Commander', commander);
            garden.set('GardenCli', this);

            garden.init();

            // run commands
            commander.parse(process.argv);

            // show help
            if (!commander.args.length)
                commander.help();

            // exit
            process.exit(0);
        }.bind(this));

    }
};

GardenCli.Garden = require('./Garden');

module.exports = GardenCli;