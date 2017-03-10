/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandFunctionalTest = function (command, config, commander, logger) {

    var wait = require('wait.for');
    var fs = require('fs');
    var path = require('path');
    var execSync = require('child_process').execSync;

    this.run = function (name) {

        var name = name || 'features';
        var npmBin = execSync('npm bin').toString().replace(/(\r\n|\n|\r)/gm, '');
        var cmd = path.join(npmBin, 'cucumber-js');

        if (commander.tags) {
            cmd += ' --tags ' + commander.tags;
        }

        if (name) {
            var requireDir  = name.replace('\\', '/').split('/');
            requireDir = commander.require || requireDir;

            cmd += ' --require ' + requireDir;
        }

        cmd += ' --format pretty ' + name;

        wait.forMethod(command, 'run', cmd);
    };

};

module.exports = CommandFunctionalTest;
module.exports.$inject = ['Command', 'config', 'Commander', 'Logger'];
