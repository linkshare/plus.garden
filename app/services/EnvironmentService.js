function EnvironmentService(container) {
    var which = require('which');
    var async = require('async');
    var _ = require('underscore');

    var config = container.get('config');

    var child_process = require('child_process');
    var exec = child_process.exec;

    this.hasBin = function (bin, next) {
        which(bin, function (err, path) {
            next(null, !!path);
        });
    };

    this.testBin = function (command, regexp, next) {
        exec(command, function (error, stdout, stderr) {
            var string = stdout + stderr;

            if (regexp.test(string)) {
                next(null, true);
            } else {
                next(null, false);
            }
        });
    };

    this.test = function (names, next) {
        if(!_.isArray(names)) {
            names = [names]
        }

        async.each(names, function (name, next) {
            var gardenDir = config.get('garden_dir');
            var tester = require(gardenDir + '/app/environment/tests/' + name);
            tester(container, next);
        }, next);
    }
}

EnvironmentService.$inject = ['container'];
module.exports = EnvironmentService;