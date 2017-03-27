/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var utils = {
    escape: function(str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    },

    isObject: function(value) {
        return typeof value === 'function' || typeof value === 'object' && !!value;
    }
};

module.exports = utils;
