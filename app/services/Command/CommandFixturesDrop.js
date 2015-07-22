var CommandFixturesDrop = function (loader, logger) {

    this.run = function () {
        loader.drop();
        logger.info('done');
    }

}

module.exports = CommandFixturesDrop;
module.exports.$inject = ['FixtureLoader', 'Logger'];
