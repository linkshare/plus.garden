UPGRADE FROM 0.0.x to 0.1.0
=======================

Node.js
-------

* Dropped support for Node 0.10. Use Node 6.9 or higher instead.

Selenium
--------

* Dropped hard dependency with [`Selenium`](http://www.seleniumhq.org) and [`JAVA`](https://www.java.com). Now you are free to select way of installing [`Selenium`](http://www.seleniumhq.org) by yourself. Read the [guide](https://github.com/Dsazz/plus.garden.webdriver/blob/master/docs/selenium-installation.md) of installing Selenium for package [`plus.garden.webdriver`](https://github.com/Dsazz/plus.garden.webdriver).

Webdriver
-----------

 *  The `Webdriver.Browser` and `Webdriver.Browser.Config` has been removed. Now it separate package [`plus.garden.webdriver`](https://github.com/Dsazz/plus.garden.webdriver).

cucumber-js
-------

 * Updated version of [`cucumber-js`](https://github.com/cucumber/cucumber-js) to `2.0.0-x` version.

 * Update support code library interface - instead of exporting a function and calling methods on this, 
   require the cucumber module and call defineSupportCode which passes an object as the first argument whch exposes the methods. 
   Overriding the world constructor has changed from overriding the World property to calling setWorldConstructor:

   Before:

   ```javascript
      module.exports = function () {
        this.Given(/^a step$/, function() {});
        this.World = CustomWorld
      });
   ```

   After:

   ```javascript
      var {defineSupportCode} = require('cucumber');

      defineSupportCode(function({Given, setWorldConstructor}) {
        Given(/^a step$/, function() {});
        setWorldConstructor(CustomWorld);
      });
   ```

cucumber.usesteps
-----------

 *  In connection with the update [`cucumber-js`](https://github.com/cucumber/cucumber-js) to `2.0.0-x` version, [`cucumber.usesteps`](https://www.npmjs.com/package/cucumber.usesteps) is not supported anymore and throws an
   exceptions in [`steps definitions`](https://github.com/Dsazz/plus.garden/blob/master/docs/features-definitions.md#demo-feature-definition). See [`CHANGELOG.md`](https://github.com/cucumber/cucumber-js/blob/master/CHANGELOG.md#200-rc4-2016-12-19) of [`cucumber-js`](https://github.com/cucumber/cucumber-js) for more details.

CLI
-----

 1. List of Command classes has been removed:
  
  * `CommandInit`

  * `CommandCoverageRemove` 
 
  * `CommandCoverageMerge` 
 
  * `CommandLoadTest`
 
  * `CommandUnitTest`
 
 2. List of CLI commands which not available anymore:
 
  * `node garden coverage.remove`

  * `node garden coverage.merge [reporter]`

  * `node garden load [name]`

  * `node garden unit [name]`
 
 3. Options `-r, --reset, -m, --merge, -c, --coverage` not available anymore.

NPM relations
---------------
  1. Removed a lot of useless npm package relations. List of removed packages:
   * `async`
   * `chai`		
   * `define-class`
   * `istanbul`
   * `js-yaml`
   * `loadtest`
   * `mocha`
   * `moment`
   * `mongodb`
   * `request`
   * `sinon`
   * `underscore`
   * `which`
   
  2. Updated list of packages to the latest version:
   * `commander`
   * `cucumber`
   * `fs-extra`
   * `merge`
   * `plus.application`
   * `wait.for`
   * `winston`
   
