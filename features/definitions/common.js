module.exports = function(){

    this.Given(/^I am on "(.+)"/, function (url, callback) {
        this.browser.visit(url).then(callback);
    });

    this.Given(/^I am on external host "(.+)"/, function (url, callback) {
        this.browser.visitExternal(url).then(callback);
    });

    this.Given(/^I am on homepage$/, function (callback) {
        this.browser.visit('/').then(callback);
    });

    this.Given(/^I should be on "([^"]*)" page$/, function(expectedTitle, callback) {
        this.browser.assertTitle(expectedTitle).then(callback);
    });

    this.Then(/^status code should be (\d+)$/, function(statuscode, callback) {
        this.browser.assertStatus(statuscode).then(callback);
    });

    this.Then(/^take screenshot$/, function (callback) {
        this.browser.saveScreenshot('.screen.png').then(callback)
    });

}