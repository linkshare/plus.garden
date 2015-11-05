function EnvironmentService() {
    var which = require('which');

    this.hasBin = function (bin, next) {
        which(bin, function (err, path) {
            next(null, !!path);
        });
    }
}
EnvironmentService.$inject = [];
module.exports = EnvironmentService;