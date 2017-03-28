/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var CommandFunctionalTest = function (command, config, commander, logger) {

    var wait = require('wait.for');
    var path = require('path');
    var execSync = require('child_process').execSync;

    var defaultTestDir = commander.require || 'features';
    var defaultRerunFile = config.get("command:functional_test:rerun");

    var prepareRequireDir = function (name) {
        var rootDir = name.split(path.sep).shift()
        var requireDir = rootDir || defaultTestDir;

        return requireDir;
    }

    var appendOptionRerun = function (cmd) {
        var rerunFile = true === commander.rerun ? defaultRerunFile : commander.rerun;
        cmd += ' ' + rerunFile;

        return cmd;
    }

    var appendOptionTags = function (cmd) {
        cmd += ' --tags ' + commander.tags;

        return cmd;
    }

    var appendOptionRequire = function (cmd, requireDir) {
        cmd += ' --require ' + requireDir;

        return cmd;
    }

    var appendOptionFormat = function (cmd) {
        cmd += commander.format ? (' --format ' + commander.format) : (' --format rerun:' + defaultRerunFile);

        return cmd;
    }

    var appendTestLocation = function (cmd, name) {
        cmd += ' ' + name;

        return cmd;
    }

    this.run = function (name) {
        name = name || defaultTestDir;

        var npmBin = execSync('npm bin').toString().replace(/(\r\n|\n|\r)/gm, '');
        var cmd = path.join(npmBin, 'cucumber-js');
        var requireDir = prepareRequireDir(name);

        if (commander.rerun) {
            cmd = appendOptionRerun(cmd);
        } else {

            if (commander.tags) {
                cmd = appendOptionTags(cmd);
            }

            cmd = appendTestLocation(cmd, name);
        }

        cmd = appendOptionRequire(cmd, requireDir);
        cmd = appendOptionFormat(cmd);

        wait.forMethod(command, 'run', cmd);
    };

};

module.exports = CommandFunctionalTest;
module.exports.$inject = ['Command', 'config', 'Commander', 'Logger'];
