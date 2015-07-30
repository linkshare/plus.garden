/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommanderInfo = function (logger, commander, config) {

    this.printInput = function () {
        logger.info('Command: `%s`, env: `%s`', commander.args.join(' '), config.get('env'));
    }

}

module.exports = CommanderInfo;
module.exports.$inject = ['Logger', 'Commander', 'config'];
