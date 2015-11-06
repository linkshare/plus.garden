/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 module.exports = function (garden) {

    var commander = garden.get('Commander');

    // show info
    garden.get('CommanderInfo').printInput();


    //init
    commander
        .command('init [dir]')
        .description('init structure in current or specified dir')
        .action(function (dir) {
            garden.get('CommandInit').run(dir);
        });

    //webdriver control
    commander
        .command('webdriver.start')
        .description('starting selenium server and proxy')
        .action(function () {
            garden.get('CommandWebDriver').start();
        });

    //webdriver control
    commander
        .command('webdriver.stop')
        .description('stopping selenium server and proxy')
        .action(function () {
            garden.get('CommandWebDriver').stop();
        });

    // fixtures
    commander
        .command('fixtures.load')
        .description('load all fixtures')
        .action(function () {
            garden.get('FixtureLoader').reload();
        });

    commander
        .command('fixtures.drop')
        .description('drop all fixtures')
        .action(function () {
            garden.get('FixtureLoader').drop();
        });

    // tests
    commander.option('-c, --coverage', 'with coverage');
    commander.option('-m, --merge', 'collect and merge coverage');
    commander.option('-r, --reset', 'reset (contextual:coverage)');
    commander.option('-l, --list', 'show list of tests');
    commander.option('-t, --tags [name]', 'use tags. ex.: --tags @tag-name');
    commander.option('-p, --profile [name]', 'webdriver profile, ex: --profile remote');
    commander.option('-b, --browser [name]', 'webdriver browser name, ex: --browser chrome');
    commander.option('--require [dir]', 'cucumber require option (custom world dir), ex: --require api');


    commander
        .command('test [name]')
        .description('run functional test/tests')
        .action(function (name) {
            garden.get('CommandFunctionalTest').run(name);
        });

    commander
        .command('unit [name]')
        .description('run unit test/tests')
        .action(function (name) {
            garden.get('CommandUnitTest').run(name);
        });

    commander
        .command('load [name]')
        .description('run load test/tests')
        .action(function (name) {
            garden.get('CommandLoadTest').run(name);
        });

    // coverage
    commander
        .command('coverage.merge [reporter]')
        .description('merge all coverage. reporter is optional: [clover, cobertura, html]. default: lcov.')
        .action(function (reporter) {
            garden.get('CommandCoverageMerge').run(reporter);
        });

    commander
        .command('coverage.remove')
        .description('remove all coverage')
        .action(function () {
            garden.get('CommandCoverageRemove').run();
        });
}

