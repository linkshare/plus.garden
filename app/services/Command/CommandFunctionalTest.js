/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandFunctionalTest = function (command, config, commander, logger, commandCoverageMerge) {

    var wait = require('wait.for');
    var request = require('request');
    var fs = require('fs');

    var coverage_url = config.get('host') + config.get('coverage_url');

    this.request = function (path, done) {

        var url = coverage_url + path;

        logger.info('Call `%s`', url);

        request(url, function (error, response, body) {

            if (error) return done(error);

            if (response.statusCode == 200) {
                done(null, body);
            }
            else {
                done(new Error('Could call URL: ' + url));
            }

        });

    }

    this.reset = function () {

        if (commander.coverage && commander.reset) {

            logger.info('Start to reset web coverage..');

            wait.forMethod(this, 'request', '/reset');
            logger.info('Web coverage was reset');

        }

    }

    this.collect = function () {

        if (commander.coverage) {
            logger.info('Collecting coverage..');
            this.load();
            logger.info('done');
        }

    }

    this.merge = function () {

        if (commander.merge) {
            logger.info('Merging coverage..');
            commandCoverageMerge.run();
            logger.info('done');
        }

    }

    this.run = function (name) {

        this.reset();

        var name = name ? name : 'features';

        var cmd = ''

        cmd += './node_modules/.bin/cucumber.js'

        if (commander.tags) {
            cmd += ' --tags ' + commander.tags;
        }

        if (name) {

            var requireDir  = require('underscore')(name.replace('\\', '/').split('/')).first();
            requireDir = commander.require ? commander.require : requireDir;

            cmd += ' --require ' + requireDir;
        }

        cmd += ' --format pretty ' + name;

        wait.forMethod(command, 'run', cmd);

        this.collect();
        this.merge();
    }

    this.load = function () {

        logger.info('Loading coverage ...');
        var data = wait.forMethod(this, 'request', '/object');

        var coverageDir = config.get('root_dir') + '/coverage';

        // make dir if not exist
        if (!fs.existsSync(coverageDir + '/test')) {
            fs.mkdirSync(coverageDir + '/test');
        }

        // save coverage
        logger.info('Save coverage');
        fs.writeFileSync(coverageDir + '/test/coverage.json', data);

        logger.info('Generate coverage report');

        // generate coverage
        wait.for(function (done) {
            wait.launchFiber(function () {
                wait.forMethod(command, 'run', './node_modules/.bin/istanbul report --root=./coverage/test --dir=./coverage/test');
                done();
            });
        });

    }

}

module.exports = CommandFunctionalTest;
module.exports.$inject = ['Command', 'config', 'Commander', 'Logger', 'CommandCoverageMerge'];
