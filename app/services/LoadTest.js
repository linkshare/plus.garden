/* =================================================================================
 * @author Vladimir Polyakov
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var LoadTest = function (config, logger) {

    var wait = require('wait.for');
    var moment = require('moment');
    var loadtest = require('loadtest');
    var util = require('util');
    var _ = require('underscore');

    this.run = function(test_config) {

        var host = config.get('load:config:host');

        var options = {
            url: host + test_config.endpoint,
            maxRequests: test_config.requests,
            concurrency: test_config.concurrency
        };

        logger.info('[START] '+options.url);
        logger.info('[WITH] Request(s): "'+options.maxRequests+'"; Concurrency: "'+options.concurrency+'"');

        var result = wait.forMethod(loadtest, "loadTest", options);

        // transformation
        return {
            duration: moment.duration(result.totalTimeSeconds, 'seconds').asMilliseconds(),
            errorMessage: 'error codes: '+util.inspect(result.errorCodes),
            hasError: !_(result.errorCodes).isEmpty()
        };

    }

};

module.exports = LoadTest;
module.exports.$inject = ["config", 'Logger'];
