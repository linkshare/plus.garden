/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

 var Options = function (config, commander) {

    var options = commander ? commander : config.get('GARDEN_CLI') || {};

    this.isCli = function () {
        return commander ? true : false;
    }

    this.get = function (name) {
        return options[name] ? options[name] : undefined;
    };

    this.set = function (name, value) {
        options[name] = value;
    };

};

module.exports = Options;

module.exports.$inject = ['config', 'Commander'];
