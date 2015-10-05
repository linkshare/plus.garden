var hooks = function () {

    this.Before(function (callback) {
        this.browserService.before(callback);
    });

    this.After(function (callback) {
        this.browserService.after(callback);
    });

    this.Before("@fixtures.drop", function (callback) {
        this.garden.wait.launchFiber(function () {
            this.garden.get('FixtureLoader').drop();
            callback();
        }.bind(this));
    });

    this.Before("@fixtures.load", function (callback) {
        this.garden.wait.launchFiber(function () {
            this.garden.get('FixtureLoader').reload();
            callback();
        }.bind(this));
    });

    this.Before("@locale.fr", function (callback) {
        this.browserService.addHeaders({"Accept-Language": "fr"}, callback);
    });

};

module.exports = hooks;