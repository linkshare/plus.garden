# Plus.garden! [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
[API Reference](https://github.com/Dsazz/plus.garden.webdriver/edit/master/docs/API-reference.md) |
[CLI](./docs/Command-line-usage.md) |
[CSS Selectors](https://github.com/Dsazz/plus.garden.webdriver/blob/master/docs/css-selectors.md) |
[Features and Definitions](./docs/features-definitions.md) |
[Config](./docs/configuration.md) | [Modules](./docs/modules.md)

Garden is a BDD testing framework for browser based apps and websites.

It's built on Node.js, Сucumber.js, Selenium WebDriver API.

----------

> ### Main Features
> - Simple API to manage browser (WebDriver)
> - Using CSS3 selectors to interact with DOM
> - All network interactions data are accessible within the tests (headers, body, size etc)
> - Built-in command-line test runner
> - Head and headless browser testing (phantom.js, chrome, firefox)

## Requirements
- `node.js`

## Getting started

1. Make a new directory, and `cd` into it:
   ```
   mkdir my-new-project && cd $_
   ```

2. Setup garden environment by [generator-garden](https://github.com/Dsazz/generator-garden/)
   ```bash
   npm install -g yo generator-garden
   ```

3. Then generate your new project:
   ```bash
   yo garden
   ```

4. Run first test
> NOTE: If you use [`plus.garden.webdriver`](https://github.com/Dsazz/plus.garden.webdriver), please start [Selenium](http://www.seleniumhq.org/) server first.
   ```
   node garden.js test 
   ```

   It execute next scenario
   ```gherkin
     Scenario: I want to see good health
       Given  I am on external host "https://twitter.com/"
       Then   status code should be 200
       Then   take screenshot
   ```

## Usage

[Generator of garden](https://github.com/Dsazz/generator-garden/) generates the simplest scenario by default:

**[your folder]/features/Health.feature**
```gherkin
@webdriver.init @webdriver.quit
Feature: Health feature

  @health
  Scenario: I want to see good health
    Given  I am on external hosts "https://twitter.com/" with element
    Then   take screenshot
```

with step defenitions that cover this, it looks like:

**[your folder]/features/step_definitions/common.js**
```javascript
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
```

Full example of this you can find in `features` folder of 
[Generator of garden](https://github.com/Dsazz/generator-garden/):
- [features/Health.feature](https://github.com/Dsazz/generator-garden/blob/master/generators/app/templates/features/Health.feature) # feature file
- [features/step_definitions/common.js](https://github.com/Dsazz/generator-garden/blob/master/generators/app/templates/features/step_definitions/common.js) # javascript support 

  * More details about [features and definitions](./docs/features-definitions.md)
  * [Webdriver Module you can find here](https://github.com/Dsazz/plus.garden.webdriver)
  * [API Reference you can find here](./docs/API-reference.md)

### Fixtures
Usually we need fixtures in our applications to have some sandbox.
This functionality available via modules. For example mongodb fixtures looks like this:
```javascript
    //users.js
    exports.users = [
        { name: 'Gob' },
        { name: 'Buster' },
        { name: 'Steve Holt' }
    ];
```

and garden loads this in tests and in CLI.
```
./garden.js fixtures.load
./garden.js fixtures.drop
```
For now garden supports `mongodb` and `mysql` fixtures via modules. Feel free to develop new ones.

For more examples please take a look:
* [MongoDB fixtures](https://github.com/linkshare/plus.garden.fixtures-mongo) `mongo fixtures loader`
* [MySQL fixtures](https://github.com/linkshare/plus.garden.fixtures-mysql) `mysql fixtures loader`

### RESTFul API testing
When we develop web-service/micro-services we need to test RESTFul API.
That is great ability to test api and have some user friendly specification for this.
It looks like this one:

```gherkin
    # demo/get.feature

    Feature: Make a GET request
        In order to programmatically access
        As a Web Service User
        I need to have an ability to make a GET request and check response

        Scenario: Make a GET request to Fake Online REST API
          When I make GET request to "http://jsonplaceholder.typicode.com/posts/1"
          Then the status code should be 200
           And content type should be "application/json; charset=utf-8"
           And the JSON response should be:
           """
           {
             "userId": 1,
             "id": 1,
             "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
             "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
           }
           """
```

  * [API tester you can find here](https://github.com/linkshare/plus.garden.api)

### Modules
Full list of modules we will publish [here (Modules)](./docs/modules.md)

## Be Happy!
And cover you stuff with tests!

[npm-image]: https://badge.fury.io/js/plus.garden.svg
[npm-url]: https://npmjs.org/package/plus.garden
[daviddm-image]: https://david-dm.org/Dsazz/plus.garden.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Dsazz/plus.garden
