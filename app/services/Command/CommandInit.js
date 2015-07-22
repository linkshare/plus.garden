var CommandInit = function (config, logger) {

    var wait = require('wait.for');
    var fs = require('fs-extra');

    var dirs = [
        'coverage',
        'features',
        'fixtures',
        'logs',
        'smoke',
        'tests',
        'config.json',
        'parameters.json.dist',
        'container.js'
    ];

    this.run = function () {

        var srcDir = config.get('garden_dir');
        var distDir = config.get('root_dir');

        dirs.forEach(function (name) {

            var src = srcDir + '/' + name;
            var dist = distDir + '/' + name;

            if (!fs.existsSync(dist) && fs.existsSync(src)) {
                logger.info('init: %s', name);
                wait.forMethod(fs, 'copy', src, dist);
            }
            else {
                logger.info('skip: %s', name);
            }
        });

        logger.info('done');
    }

}

module.exports = CommandInit;
module.exports.$inject = ['config', 'Logger'];
