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
    commander.option('-l, --list', 'show list of tests');
    commander.option('-t, --tags [name]', 'use tags. ex.: --tags @tag-name');
    commander.option('-f, --format [name]', 'to specify the format of the output. ex.: --format pretty');
    commander.option('-r, --rerun [name]', 'rerun failed tests which were written into the file [name], by default @rerun.txt. ex.: --rerun [name]');
    commander.option('-p, --profile [name]', 'webdriver profile, ex: --profile remote');
    commander.option('-b, --browser [name]', 'webdriver browser name, ex: --browser chrome');
    commander.option('--require [dir]', 'cucumber require option (custom world dir), ex: --require api');

    commander
        .command('test [name]')
        .description('run functional test/tests')
        .action(function (name) {
            garden.get('CommandFunctionalTest').run(name);
        });

};
