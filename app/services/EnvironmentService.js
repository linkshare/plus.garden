function EnvironmentService() {
    var which = require('which');
    var child_process = require('child_process');
    var exec = child_process.exec;

    this.hasBin = function (bin, next) {
        which(bin, function (err, path) {
            next(null, !!path);
        });
    }

    this.testBin = function (command, regexp, next) {
        exec(command, function (error, stdout, stderr) {
            var string = stdout + stderr;

            if (regexp.test(string)) {
                next(null, true);
            } else {
                next(null, false);
            }
        });
    }
}
EnvironmentService.$inject = [];
module.exports = EnvironmentService;