var FixtureLoader = function (container) {

    function getLoaders() {
        return container.find(['garden.js', 'fixtures', 'loader']);
    }

    this.load = function () {
        getLoaders().forEach(function (loader) {
            loader.load();
        });

    }

    this.drop = function () {
        getLoaders().forEach(function (loader) {
            loader.drop();
        });
    }

    this.reload = function () {
        this.drop();
        this.load();
    }

}

module.exports = FixtureLoader;
module.exports.$inject = ['container'];
