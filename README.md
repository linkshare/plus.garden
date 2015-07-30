Plus.garden!
===================
[API Reference](./docs/API-reference.md) |
[CLI](./docs/Command-line-usage.md) |
[CSS Selectors](./docs/css-selectors.md) |
[Features and Definitions](./docs/features-definitions.md) |
[Modules](./docs/modules.md)

Garden is a BDD testing framework for browser based apps and websites.

It's built on Node.js, cucumber.js, Selenium WebDriver API.

----------

> ###Main Features
> - Simple API to manage browser (WebDriver)
> - Using CSS3 selectors to interact with DOM
> - All network interactions data are accessible within the tests (headers, body, size etc)
> - Built-in command-line test runner
> - Head and headless browser testing (phantom.js, chrome, firefox)

Getting started
-------------
Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `npm init`
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

