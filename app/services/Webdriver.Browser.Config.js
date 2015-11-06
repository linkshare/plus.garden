/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var BrowserConfig = function (config) {
    this.getParameter = function (name) {
        var profile = config.get('webdriver:profile_name');
        var parameter = config.get('webdriver:profile:' + profile + ':' + name);

        return parameter || config.get('webdriver:' + name);
    };

    this.setParameter = function (name, value) {
        var profile = config.get('webdriver:profile_name');
        config.set('webdriver:profile:' + profile + ':' + name, value);
        config.set('webdriver:' + name, value);
    }
};

module.exports = BrowserConfig;
module.exports.$inject = ['config'];