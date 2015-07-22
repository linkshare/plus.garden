var CommandFixturesLoad = function (loader, logger) {

    this.run = function () {
        loader.reload();
        logger.info('done');
    }

}

module.exports = CommandFixturesLoad;
module.exports.$inject = ['FixtureLoader', 'Logger'];
