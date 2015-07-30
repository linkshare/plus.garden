/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var Class = require('define-class');
var DbProvider = require('./DbProvider');

var MongoDbProvider = Class(DbProvider, {

    init: function (config, logger) {
        this.wait = require('wait.for');
        this.MongoClient = require("mongodb").MongoClient;

        this._super(config, logger);
    },
    _connect: function (name) {

        var uri = this.config.get(name);

        if(!uri) throw new Error('Settings for `'+name+'` is not defined');

        try
        {
            var db = this.wait.for(this.MongoClient.connect, uri);
            this.logger.info("Connected to MongoDB `%s`.", name);
            return db;
        }
        catch (err)
        {
            this.logger.error("FATAL Failed while connecting to MongoDB: %s.", String(err));
            throw err;
        }
    }

});

module.exports = MongoDbProvider;
module.exports.$inject = ['config', 'Logger'];
