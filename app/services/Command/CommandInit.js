/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var CommandInit = function (config, logger) {

    var wait = require('wait.for');
    var fs = require('fs-extra');

    var dirs = [
        'features',
        'fixtures',
        'logs',
        'config.json',
        'parameters.json.dist',
        'container.js',
        'garden.js',
        '.gitignore'
    ];

    this.run = function (dir) {

        var srcDir = config.get('garden_dir');
        var distDir = config.get('root_dir');

        distDir = dir || distDir;

        dirs.forEach(function (name) {

            var src = srcDir + '/' + name;
            var dist = distDir + '/' + name;

            if (!fs.existsSync(dist) && fs.existsSync(src)) {
                logger.info('init: %s', name);
                //create entrypoint for run garden
                if (name == 'garden.js') {
                    wait.forMethod(fs, 'copy', srcDir + '/garden-entrypoint.js', dist);
                    fs.chmodSync(dist, '755');
                } else {
                    wait.forMethod(fs, 'copy', src, dist);
                }


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
