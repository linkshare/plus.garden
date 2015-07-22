var CommanderInfo = function (logger, commander, config) {

    this.printInput = function () {
        logger.info('Command: `%s`, env: `%s`', commander.args.join(' '), config.get('env'));
    }

}

module.exports = CommanderInfo;
module.exports.$inject = ['Logger', 'Commander', 'config'];
