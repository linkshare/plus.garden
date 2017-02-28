var {defineSupportCode} = require('cucumber');
defineSupportCode(function({ Given, Then }) {
    Given(/^I am on "(.+)"/, function (url, callback) {
        this.browser.visit(url).then(callback);
    });

    Given(/^I am on external host "(.+)"/, function (url, callback) {
        this.browser.visitExternal(url).then(callback);
    });

    Given(/^I am on homepage$/, function (callback) {
        this.browser.visit('/').then(callback);
    });

    Given(/^I should be on "([^"]*)" page$/, function(expectedTitle, callback) {
        this.browser.assertTitle(expectedTitle).then(callback);
    });

    Then(/^take screenshot$/, function (callback) {
        this.browser.saveScreenshot('.screen.png').then(callback);
    });
});
