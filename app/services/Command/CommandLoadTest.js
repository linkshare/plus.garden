/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandLoadTest = function (config, logger, commander, loadTest, fixturesLoader) {

    var wait = require('wait.for');
    var moment = require('moment');
    var _ = require('underscore');

    var tests = config.get('load:tests');

    var summary = {passed: 0, failed: 0};

    function runTest(name) {

        var options = getOptionsByName(name);

        if(!options) return logger.error('test not found `%s`', name);

        logger.info('[LOAD] "' + name + '"');

        var result = loadTest.run(options);

        if (result.hasError) {

            logger.error('[FAIL] ' + result.errorMessage);

            summary.failed++;

            return false;
        }

        if (options.duration < result.duration) {

            logger.error('[FAIL] Time for test should be less than "' + options.duration + '" but given '+result.duration);

            summary.failed++;

            return false;

        } else {

            logger.info('[OK] Test pass. It tooks: '+result.duration+', expected: '+ options.duration);

            summary.passed++;

            return true;
        }

    }

    function getOptionsByName(name) {
        return  tests[name];
    }

    this.execute = function (name) {

        if (name) {
            runTest(name)
        } else {
            _(tests).each(function (options, name) {
                runTest(name)
            });
        }

        logger.info(summary.passed+' test(s) pass');

        if(summary.failed > 0) {

            logger.error(summary.failed+' test(s) fail');

            process.exit(1);
        }

    };

    this.run = function (name) {
        if (commander.list) {
            this.list();
        } else {
            this.execute(name);
        }
    };

    this.list = function () {

        console.log('Tests list:');
        _(tests).each(function (options, name) {
            console.log('- %s [%s]', name, options.endpoint);
        });

    }

};

module.exports = CommandLoadTest;
module.exports.$inject = ["config", 'Logger', 'Commander', 'LoadTest', 'FixtureLoader'];
