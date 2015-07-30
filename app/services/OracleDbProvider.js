/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var Class = require('define-class');
var DbProvider = require('./DbProvider');

var OracleDbProvider = Class(DbProvider, {
    init: function (config, logger) {

        this.wait = require('wait.for');
        this.oracle = require('oracle');

        this._super(config, logger);
    },
    _connect: function (name) {

        var conf = this.config.get(name);

        if(!conf) throw new Error('Settings for `'+name+'` is not defined');

        try
        {
            var connection = this.wait.for(this.oracle.connect, conf);
            this.logger.info("Connected to OracleDB `%s`.", name);
            return  connection;
        }
        catch (err)
        {
            this.logger.error("FATAL Failed while connecting to OracleDB: %s.", String(err));
            throw err;
        }
    }

});

module.exports = OracleDbProvider;
module.exports.$inject = ['config', 'Logger'];
