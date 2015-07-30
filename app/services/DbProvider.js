/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var Class = require('define-class');

var DbProvider = Class({

    init: function (config, logger) {

        this.config = config;
        this.logger = logger;

        this.dbs = {};
    },

    get: function (name) {

        if(!this.dbs[name])
            this.dbs[name] = this._connect(name);

        return this.dbs[name];
    },
    
    close: function (name) {
        this.dbs[name].close();
        return delete this.dbs[name];
    },

    _connect: function (name) {
        throw new Error('Not implemented');
    }

});

module.exports = DbProvider;
module.exports.$inject = ['config', 'Logger'];
