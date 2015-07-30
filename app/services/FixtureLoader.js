/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var FixtureLoader = function (container, logger) {

    var loaders = container.find(['garden.js', 'fixtures', 'loader']);

    if (loaders.length == 0) {
        logger.warn('fixture loader module not found');
        logger.info('Visit https://github.com/linkshare/plus.garden/blob/master/docs/modules.md to get necessary module');
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
