Plus.garden!
===================
[API Reference](./docs/API-reference.md) |
[CLI](./docs/Command-line-usage.md) |
[CSS Selectors](./docs/css-selectors.md) |
[Features and Definitions](./docs/features-definitions.md) |
[Config](./docs/configuration.md) | [Modules](./docs/modules.md)

Garden is a BDD testing framework for browser based apps and websites.

It's built on Node.js, cucumber.js, Selenium WebDriver API.

----------

> ###Main Features
> - Simple API to manage browser (WebDriver)
> - Using CSS3 selectors to interact with DOM
> - All network interactions data are accessible within the tests (headers, body, size etc)
> - Built-in command-line test runner
> - Head and headless browser testing (phantom.js, chrome, firefox)

## Requirements
- `node.js`, `java`
- `phantomjs` optional, but uses by default

## Getting started

- `sudo npm install --global plus.garden` # install plus garden
- `plus.garden init xxx-project` # init garden structure
- `cd xxx-project` # go inside
- `plus.garden test` # run smoke/healthy tests, it executes next scenario:

```gherkin
  Scenario: I want to see good health
    Given  I am on external host "https://twitter.com/"
    Then   status code should be 200
    Then   take screenshot
```


### Local dependency way

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `npm init` and go through hints
```
npm init
```

Install garden as a dependency
```
npm install plus.garden --save
```

Init directory structure
```
node node_modules/plus.garden/garden.js init
```

run first test
```
node garden.js test
```

## Usage

Garden generates the simplest scenario by default:

**[your folder]/features/Health.feature**
```gherkin
 Scenario: I want to see good health
   Given  I am on external host "https://twitter.com/"
   Then   status code should be 200
   Then   take screenshot
```

with step defenitions that cover this, it looks like:

**[your folder]/features/step_definitions/common.js**
```javascript
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
```

Full example of this you can find in `features` folder:
- `features/Health.feature` # feature file
- `features/step_definitions/common.js` # javascrip support 

More details about [features and definitions](./docs/features-definitions.md)
and [API Reference you can find here](./docs/API-reference.md)

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

