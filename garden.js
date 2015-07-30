#!/usr/bin/env node

/* =================================================================================
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var Garden = require('./app/lib/GardenCli');

if (!module.parent) {
    new Garden().run();
}

module.exports = Garden;
