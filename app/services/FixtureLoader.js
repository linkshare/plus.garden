/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var FixtureLoader = function (container, logger) {

    this.load = function (tags) {
        this.loaders(tags).forEach(function (loader) {
            loader.load();
        });
    }

    this.drop = function (tags) {
        this.loaders(tags).forEach(function (loader) {
            loader.drop();
        });
    }

    this.reload = function (tags) {
        this.drop(tags);
        this.load(tags);
    }

    this.loaders = function(tags) {
        var loaders = [];

        tags = tags || ['garden.js', 'fixtures', 'loader'];
        loaders = container.find(tags);

        if (loaders.length == 0) {
            logger.warn('fixture loader module not found');
            logger.info('Visit https://github.com/linkshare/plus.garden/blob/master/docs/modules.md to get necessary module');
        }

        return loaders;
    }

}

module.exports = FixtureLoader;
module.exports.$inject = ['container', 'Logger'];
