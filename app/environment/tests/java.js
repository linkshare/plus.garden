module.exports = function (container, next) {

    var EnvironmentService = container.get('EnvironmentService');
    var logger = container.get('Logger');

    EnvironmentService.hasBin('java', function (err, exists) {

        if (!exists) {
            logger.error('java was not found');
            next(new Error('java was not found'));
        } else {
            next();
        }
    });

};