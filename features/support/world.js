//var Garden = require('plus.garden').Garden;
var Garden = require('../../app/lib/Garden');
var garden = new Garden().init();

var World = function World(callback) {

    this.config = garden.get('config');

    //Assertion
    this.chai = require('chai');
    this.should = this.chai.should();
    this.expect = this.chai.expect;
    this.assert = this.chai.assert;

    this.moment = require('moment');
    this.async = require('async');

    garden.get('Webdriver.Browser').create(function (browserService) {
        this.browserService = browserService;
        this.driver = browserService.driver;
        this.browser = browserService.browser;
        this.proxy = browserService.proxy;
        callback();
    }.bind(this));

};

exports.World = World;