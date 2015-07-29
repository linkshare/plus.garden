var FixtureLoader = function (container, logger) {

    var loaders = container.find(['garden.js', 'fixtures', 'loader']);

    if (loaders.length == 0) {
        logger.warn('fixture loader module not found');
    }

    this.load = function () {
        loaders.forEach(function (loader) {
            loader.load();
        });
    }

    this.drop = function () {
        loaders.forEach(function (loader) {
            loader.drop();
        });
    }

    this.reload = function () {
        this.drop();
        this.load();
    }

}

module.exports = FixtureLoader;
module.exports.$inject = ['container', 'Logger'];
