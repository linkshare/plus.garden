var LoggerInitializer = function (config, options) {

    if (options.get('debug')) {
        config.set('logger:level', 'debug');
    } else {
        if (!options.isCli()) {
            config.set('logger:level', 'error');
        }
    }

};

module.exports = LoggerInitializer;

module.exports.$inject = ['config', 'Options'];
module.exports.$tags = ['garden.js', 'module'];