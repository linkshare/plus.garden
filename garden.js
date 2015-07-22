#!/usr/bin/env node

var Garden = require('./app/lib/GardenCli');

if (!module.parent) {
    new Garden().run();
}

module.exports = Garden;
