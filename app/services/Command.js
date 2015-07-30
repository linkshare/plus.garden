/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var Command = function (config, commander) {

    var CommandClass = require('../lib/Command');

    var replacement = {
        "./node_modules/.bin/": config.get('garden_dir') + "/node_modules/.bin/"
    };

    this.command = new CommandClass(
        config.get('root_dir'),
        config.get('env'),
        replacement,
        commander
    );

    this.run = function () {
        return this.command.run.apply(this.command, arguments);
    }
}

module.exports = Command;
module.exports.$inject = ['config', 'Commander'];
