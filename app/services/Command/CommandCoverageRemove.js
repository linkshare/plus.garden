
var CommandCoverageRemove = function (config, logger) {

    var wait = require('wait.for');
    var fs = require('fs');
    var fse = require('fs-extra');

    this.run = function () {


        var path = config.get('root_dir') + '/coverage';
        var files = fs.readdirSync(path);

        files.forEach(function (file) {

            if(!/^\./.test(file))
            {
                fse.removeSync(path + '/' + file);
            }

        });

        logger.info('done');

    }

}

module.exports = CommandCoverageRemove;
module.exports.$inject = ['config', 'Logger'];
