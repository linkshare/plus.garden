Plus.garden!
===================

Garden is an BDD testing framework for browser based apps and websites.

built on Node.js, cucumber.js, Selenium WebDriver API.

----------

> ###Main Features
> - Simple but powerful syntax which enables you to write tests very quickly.
> - Using only Javascript and CSS3 selectors.
> - Using Cucumber gherkin syntax
> - Reuse scenarios
> - Accessing the HTTP response such StatusCode headers etc
> - Simple API to manage browser (WebDriver)
> - Built-in command-line test runner
> - automatic WebDriver servers runner/stopper
> - head and headless browser testing (phantom.js, chrome)

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

Install garden as dependency
```
npm install plus.garden --save
```

Inint directory structure
```
node node_modules/plus.garden/garden.js init
```

Commandline runner cucumber tests
-------------
Show available options
```bash
node garden.js
or
./garden.js
```
Run all tests
```bash
./garden.js test
or
node garden.js test
```
You may specify the features to run:
```bash
./garden.js test features/offersGrid.feature
```
You may use tags to run:
```bash
./garden.js test -t @health
```
Debug mode:
```bash
./garden.js test -d  (--debug)
```
profiles:
```bash
./garden.js test -p remote  (--profile)
```
browser:
```bash
./garden.js test -b chrome  (--browser)
```


Debug in real browser
-------------
###local testing
just change browser for testing
```bash
./garden.js test -b chrome  (--browser)
```


###remote
before start test you should run selenium server on machine where browser is
run on machine where browser is
```bash
./garden.js webdriver.start
```

right now run test with parameter (run on machine where tests suites are)
```bash
./garden.js test -p remote
```


Features
-------------

Features are written with the [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin) + Include parametrized scenarios
```gherkin
# features/myFeature.feature

Feature: Example feature

  Scenario: I want to sign in as "user-1" with included steps
    Given I sign in as "user-1" with email "user1@user1": use steps "features/signin.usefeature"

  Scenario: I want to sign in as "user-2" with included steps
    Given I sign in as "user-2" with email "user2@user2": use steps "features/signin.usefeature"
```

scenario for including (including scenarion can use only "" parameters)
```gherkin
#features/signin.usefeature

  Scenario: I sign in as "user-1" with email "user1@user1"
    Given I sign in as "user-1"
    Then I should be signed in
    Then I should see message "user1@user1"
```

Demo feature definition
-------------

```javascript
    this.Given(/^I login with username "([^"]*)" and password "([^"]*)"$/, function(username, password, callback) {
        this.browser
            .visit('http://example.com')
            .assertStatus(200)
            .assertTitle('Login page')
            .setValue("#username", username)
            .setValue("#password", password)
            .click('input[name="login"]')
            .assertStatus(200)
            .assertTitle('Secure page')
            .then(callback);
    });
```

CSS Selectors
-------------

Garden uses [Sizzle.js](http://sizzlejs.com/) which provides support for most
[CSS 3 selectors](http://www.w3.org/TR/css3-selectors/) with a few useful
extension.

Sizzle.js is the selector engine used in jQuery, so if you're familiar
with jQuery selectors, you're familiar with Sizzle.js.

The following list summarizes which selectors are currently
supported:

- `*` Any element
- `E` An element of type E
- `E#myid` An E element with ID equal to "myid"
- `E.foo` An E element whose class is "foo"
- `E[foo]` An E element with a "foo" attribute
- `E[foo="bar"]` An E element whose "foo" attribute value is exactly equal to "bar"
- `E[foo!="bar"]` An E element whose "foo" attribute value does not equal to "bar"
- `E[foo~="bar"]` An E element whose "foo" attribute value is a list of whitespace-separated values, one of which is exactly equal to "bar"
- `E[foo^="bar"]` An E element whose "foo" attribute value begins exactly with the string "bar"
- `E[foo$="bar"]` An E element whose "foo" attribute value ends exactly with the string "bar"
- `E[foo*="bar"]` An E element whose "foo" attribute value contains the substring "bar"
- `E[foo|="en"]` An E element whose "foo" attribute has a hyphen-separated list of values beginning (from the left) with "en"
- `E:nth-child(n)`  An E element, the n-th child of its parent
- `E:first-child`  An E element, first child of its parent
- `E:last-child`  An E element, last child of its parent
- `E:only-child`  An E element, only child of its parent
- `E:empty` An E element that has no children (including text nodes)
- `E:link` A link
- `E:focus` An E element during certain user actions
- `E:enabled` A user interface element E which is enabled
- `E:disabled` A user interface element E which is disabled
- `E:checked` A user interface element E which is checked (for instance a radio-button or checkbox)
- `E:input` An E element that is an input element (includes `textarea`, `select` and `button`)
- `E:text` An E element that is an input text field or text area
- `E:checkbox` An E element that is an input checkbox
- `E:file` An E element that is an input file
- `E:password` An E element that is an input password
- `E:submit` An E element that is an input or button of type `submit`
- `E:image` An E element that is an input of type `image`
- `E:button` An E element that is an input or button of type `button`
- `E:reset` An E element that is an input or button of type `reset`
- `E:header` An header element, one of h1, h2, h3, h4, h5, h6
- `E:parent` A parent element, an element that contains another element
- `E:not(s)` An E element that does not match the selector `s` (multiple selectors supported)
- `E:contains(t)` An E element whose textual contents contains `t` (case sensitive)
- `E:contains-only(t)` An E element whose textual contents contains exactly `t` (case sensitive)
- `E:first` An E element whose position on the page is first in document order
- `E:last` An E element whose position on the page is last in document order
- `E:even` An E element whose position on the page is even numbered (counting starts at 0)
- `E:odd` An E element whose position on the page is odd numbered (counting starts at 0)
- `E:eq(n)/:nth(n)` An E element whose Nth element on the page (e.g `:eq(5)`)
- `E:lt(n)` An E element whose position on the page is less than `n`
- `E:gt(n)` An E element whose position on the page is greater than `n`
- `E F` An F element descendant of an E element
- `E > F` An F element child of an E element
- `E + F` An F element immediately preceded by an E element
- `E ~ F` An F element preceded by an E element

API Reference
-------------

Garden has two objects `browser` and `dirver`

`driver` [WebDriver's primary public API](http://selenium.googlecode.com/git/docs/api/javascript/module_selenium-webdriver.html)

`browser` has two methods to get DOM elements using CSS3 selectors and uses `driver` api to work with this element like:

these are the main methods to return `driver` elements promises

###getElement
```javascript
this.browser.getElement(cssSelector).then(function (element) {
    element.click().then(callback);
});
```

###getElements
```javascript
this.browser.getElements(cssSelector).then(function (elements) {
    console.log(elements.length);
});
```

Demo definition
```javascript
    this.When(/^I uncheck "([^"]*)" if it checked$/, function(title, callback) {
        this.browser
            .getElement('label:contains('+ title +') input:checked')
            .then(function (element) {
                element.click().then(callback);
            }, function () {
                callback();
            });
    });
```

also `browser` has all methods below returns `browser` methods promises

Demo definition
```javascript
    this.Given(/^I login with username "([^"]*)" and password "([^"]*)"$/, function(username, password, callback) {
        this.browser
            .visit('http://example.com')
            .assertStatus(200)
            .assertTitle('Login page')
            .setValue("#username", username)
            .setValue("#password", password)
            .click('input[name="login"]')
            .assertStatus(200)
            .assertTitle('Secure page')
            .then(callback);
    });
```
* **Assertions**
  * [`assertTitle`](#assertTitle)
  * [`assertStatus`](#assertStatus)
  * [`assertStatusByUrl`](#assertStatusByUrl)
  * [`assertContainsText`](#assertContainsText)
  * [`assertAttributeEquals`](#assertAttributeEquals)
  * [`assertCssClassPresent`](#assertCssClassPresent)
  * [`assertCssClassNotPresent`](#assertCssClassNotPresent)
  * [`assertElementPresent`](#assertElementPresent)
  * [`assertElementNotPresent`](#assertElementNotPresent)
  * [`assertVisible`](#assertVisible)
  * [`assertHidden`](#assertHidden)
  * [`assertUrlEquals`](#assertUrlEquals)
  * [`assertUrlContains`](#assertUrlContains)
  * [`assertValue`](#assertValue)
  * [`assertValueContains`](#assertValueContains)
  * [`assertListEquals`](#assertListEquals)
  * [`assertListContains`](#assertListContains)
  * [`assertListNotContains`](#assertListNotContains)
  * [`assertListContainsOnly`](#assertListContainsOnly)
  * [`assertElementsEquals`](#assertElementsEquals)
* **Actions**
  * [`click`](#click)
  * [`clearValue`](#clearValue)
  * [`setValue`](#setValue)
  * [`submitForm`](#submitForm)
  * [`moveToObject`](#moveToObject)
  * [`dragAndDrop`](#dragAndDrop)
* **Property**
  * [`getText`](#getText)
  * [`getValue`](#getValue)
  * [`getAttribute`](#getAttribute)
  * [`getCurrentUrl`](#getCurrentUrl)
  * [`getTitle`](#getTitle)
  * [`getCssProperty`](#getCssProperty)
  * [`getElementsText`](#getElementsText)
  * [`getTagName`](#getTagName)
  * [`getLocation`](#getLocation)
  * [`getElementSize`](#getElementSize)
  * [`isVisible`](#isVisible)
* **Utility**
  * [`waitForElementVisible`](#waitForElementVisible)
  * [`waitForElementNotVisible`](#waitForElementNotVisible)
  * [`waitForElementPresent`](#waitForElementPresent)
  * [`waitForElementNotPresent`](#waitForElementNotPresent)
  * [`waitForStatusByUrl`](#waitForStatusByUrl)
  * [`saveScreenshot`](#saveScreenshot)
  * [`urlHash`](#urlHash)
  * [`pause`](#pause)
  * [`end`](#end)
  * [`refreshPage`](#refreshPage)
* **Cookie**
  * [`setCookie`](#setCookie)
  * [`getCookies`](#getCookies)
  * [`getCookie`](#getCookie)
  * [`deleteCookies`](#deleteCookies)
  * [`deleteCookie`](#deleteCookie)
* **Window**
  * [`getWindowSize`](#getWindowSize)
  * [`maximizeWindow`](#maximizeWindow)
  * [`resizeWindow`](#resizeWindow)
  * [`closeWindow`](#closeWindow)


### Assertions

<a name="assertStatus" />
###assertStatus
Checks if the HTTP response status code of current page equals to given.
```javascript
this.browser.assertStatus(statusCode).then(callback);
```
-------------
<a name="assertStatusByUrl" />
###assertStatusByUrl
Checks if the HTTP response status code of given url equals to given.
```javascript
this.browser.assertStatusByUrl(url, statusCode).then(callback);
```
-------------
<a name="assertAttributeEquals" />
###assertAttributeEquals
Checks if the given attribute of an element has the expected value.
```javascript
this.browser.assertAttributeEquals(cssSelector, attribute, expected).then(callback);
```
-------------
<a name="assertContainsText" />
###assertContainsText
Checks if the given element contains the specified text.
```javascript
this.browser.assertContainsText(cssSelector, expectedText).then(callback);
```
-------------
<a name="assertCssClassPresent" />
###assertCssClassPresent
Checks if the given element has the specified CSS class.
```javascript
this.browser.assertCssClassPresent(cssSelector, className).then(callback);
```
-------------
<a name="assertCssClassNotPresent" />
###assertCssClassNotPresent
Checks if the given element does not have the specified CSS class.
```javascript
this.browser.assertCssClassNotPresent(cssSelector, className).then(callback);
```
-------------
<a name="assertCssProperty" />
###assertCssProperty
Checks if the specified css property of a given element has the expected value.
```javascript
this.browser.assertCssProperty("#main", "display", "block").then(callback);
```
-------------
<a name="assertElementPresent" />
###assertElementPresent
Checks if the given element exists in the DOM.
```javascript
this.browser.assertElementPresent(".should_exist").then(callback);
```
-------------
<a name="assertElementNotPresent" />
###assertElementNotPresent
Checks if the given element does not exist in the DOM.
```javascript
this.browser.assertElementNotPresent(".should_not_exist").then(callback);
```
-------------
<a name="assertHidden" />
###assertHidden
Checks if the given element is not visible on the page.
```javascript
this.browser.assertHidden(".should_not_be_visible").then(callback);
```
-------------
<a name="assertTitle" />
###assertTitle
Checks if the page title equals the given value
```javascript
this.browser.assertTtitle("Garden.js").then(callback);
```
-------------
<a name="assertUrlContains" />
###assertUrlContains
Checks if the current URL contains the given value.
```javascript
this.browser.assertUrlContains("google").then(callback);
```
-------------
<a name="assertUrlEquals" />
###assertUrlEquals
Checks if the current url equals the given value.
```javascript
this.browser.assertUrlEquals("http://www.google.com").then(callback);
```
-------------
<a name="assertValue" />
###assertValue
Checks if the given form element's value equals the expected value.
```javascript
this.browser.assertValue("form.login input[type=text]", "username").then(callback);
```
-------------
<a name="assertValueContains" />
###assertValueContains
Checks if the given form element's value contains the expected value.
```javascript
this.browser.assertValueContains("form.login input[type=text]", "username").then(callback);
```
-------------
<a name="assertVisible" />
###assertVisible
Checks if the given element is not visible on the page.
```javascript
this.browser.assertVisible(".should_be_visible").then(callback);
```
-------------
<a name="assertListEquals" />
###assertListEquals
Checks if the text of elements equal with given values
```javascript
var expectedOtions = ["one", "two"];
this.browser.assertListEquals("table th", expectedOtions).then(callback);
```
-------------
<a name="assertListContains" />
###assertListContains
Checks if the text of elements contains given values
```javascript
this.browser.assertListContains("table th", 'one').then(callback);
```
-------------
<a name="assertListNotContains" />
###assertListNotContains
Checks if the text of elements not contains given values
```javascript
this.browser.assertListNotContains("table th", 'one').then(callback);
```
-------------
<a name="assertListContainsOnly" />
###assertListContainsOnly
Checks if the text of elements contains only given values
```javascript
this.browser.assertListContainsOnly("table th", 'one').then(callback);
// assert not fail if we have element "one two"
```
-------------
<a name="assertElementsEquals" />
###assertElementsEquals
Checks if quantity of elements equal with given quantity
```javascript
this.browser.assertElementsEquals("table th", qty).then(callback);
```

### Commands

-------------
<a name="clearValue" />
###clearValue
Clear a textarea or a text input element's value
```javascript
this.browser.clearValue("input[type=text]").then(callback);
```
-------------
<a name="click" />
###click
Simulates a click event on the given DOM element.
```javascript
this.browser.click(cssSelector).then(callback);
```
-------------
<a name="getValue" />
###getValue
Returns a form element current value
```javascript
this.browser.getValue('input[name="source_label"]', function(value) {
    console.log(value);
}).then(callback);
```
-------------
<a name="getAttribute" />
###getAttribute
Retrieve the value of an attribute for a given DOM element.
```javascript
this.browser.getAttribute('input[name="source_label"]', 'value', function(value) {
    console.log(value);
}).then(callback);
```
-------------
<a name="getCurrentUrl" />
###getCurrentUrl
Retrieve the value of url current page.
```javascript
this.browser
    .getCurrentUrl(function(currentUrl) {
        console.log(currentUrl);
    })
    .then(callback);
```
-------------
<a name="waitForElementVisible" />
###waitForElementVisible
Waits for an element to be visible in the page before performing any other commands or assertions. (Optional parameters: `timeout`)
```javascript
this.browser
    .waitForElementVisible('.my-visible-element', [timeout])
    .then(callback);
```
-------------
<a name="waitForElementNotVisible" />
###waitForElementNotVisible
Opposite of waitForElementVisible. Waits for an element to be not visible (i.e. hidden but existing) in the page before performing any other commands or assertions. (Optional parameters: `timeout`)
```javascript
this.browser
    .waitForElementNotVisible('.my-hidden-element', [timeout])
    .then(callback);
```
-------------
<a name="urlHash" />
###urlHash
Convenience method that adds the specified hash (i.e. url fragment) to current url.
```javascript
this.browser
    .urlHash('#hashvalue') // or 'hashvalue'
    .then(callback);
```
-------------
<a name="refreshPage" />
###refreshPage
Refreshes the current page.
```javascript
this.browser
    .refreshPage()
    .then(callback);
```
-------------
<a name="submitForm" />
###submitForm
Submit a FORM element. The submit command may also be applied to any element that is a descendant of a FORM element.
```javascript
this.browser
    .submitForm('.my-form')
    .then(callback);
```
-------------
<a name="setCookie" />
###setCookie
Set a cookie, specified as a cookie JSON object.
```javascript
this.browser
    .setCookie({
        name     : "test_cookie",
        value    : "test_value",
        path     : "/", // (Optional)
        domain   : "example.org", // (Optional)
        secure   : false, // (Optional)
        expiry   : 1395002765 // (Optional) time in seconds since midnight, January 1, 1970 UTC
    })
    .then(callback);
```
-------------
<a name="saveScreenshot" />
###saveScreenshot
Take a screenshot of the current page and saves it as the given filename.
```javascript
this.browser
    .saveScreenshot('/path/to/fileName.png')
    .then(callback);
```
-------------
<a name="maximizeWindow" />
###maximizeWindow
Maximizes the current window.
```javascript
this.browser
    .maximizeWindow()
    .then(callback);
```
-------------
<a name="resizeWindow" />
###resizeWindow
Resizes the current window.
```javascript
this.browser
    .resizeWindow(1024, 768)
    .then(callback);
```
-------------
<a name="getWindowSize" />
###getWindowSize
Retrieve the size of current window.
```javascript
this.browser
    .getWindowSize(function(size) {
        console.log(size.width + ':' + size.height);
    })
    .then(callback);
```
-------------
<a name="pause" />
###pause
Suspends the test for the given time in milliseconds.
```javascript
this.browser
    .pause(1000) // wait 1 second
    .then(callback);
```
-------------
<a name="isVisible" />
###isVisible
Determine if an element is currently displayed.
```javascript
this.browser
    .isVisible('#main', function(visible) {
        console.log(visible ? 'displayed' : 'hidden');
    })
    .then(callback);
```
-------------
<a name="getTitle" />
###getTitle
Returns the title of the current page.
```javascript
this.browser
    .getTitle(function(title) {
        console.log(title);
    })
    .then(callback);
```
-------------
<a name="getText" />
###getText
Returns the visible text for the element.
```javascript
this.browser
    .getText('#main ul li a.first', function(text) {
        console.log(text);
    })
    .then(callback);
```
-------------
<a name="getElementsText" />
###getElementsText
Returns the visible text for list of element.
```javascript
this.browser
    .getElementsText('#main ul li a.first', function(listText) {
        console.log(listText);
    })
    .then(callback);
```
-------------
<a name="getTagName" />
###getTagName
Query for an element's tag name.
```javascript
this.browser
    .getTagName('#main ul li a.first', function(tagName) {
        console.log(tagName);
    })
    .then(callback);
```
-------------
<a name="getLocation" />
###getLocation
Determine an element's location on the page. The point (0, 0) refers to the upper-left corner of the page.
```javascript
this.browser
    .getLocation('.button', function(location) {
        console.log(location.x + ':' + location.y);
    })
    .then(callback);
```
-------------
<a name="getElementSize" />
###getElementSize
Determine an element's size in pixels.
```javascript
this.browser
    .getElementSize('.button', function(size) {
        console.log(size.width + ':' + size.height);
    })
    .then(callback);
```
-------------
<a name="getCssProperty" />
###getCssProperty
Retrieve the value of a css property for a given DOM element.
```javascript
this.browser
    .getCssProperty('.button', 'color', function(color) {
        console.log(color);
    })
    .then(callback);
```
-------------
<a name="getCookies" />
###getCookies
Retrieve all cookies visible to the current page.
```javascript
this.browser
    .getCookies(function(cookies) {
        console.log(cookies[2].name + '=' + cookies[2].value);
    })
    .then(callback);
```
-------------
<a name="getCookie" />
###getCookie
Retrieve a single cookie visible to the current page.
```javascript
this.browser
    .getCookie('logged_in', function(loggedIn) {
        console.log('Logged in: '+ loggedIn);
    })
    .then(callback);
```
-------------
<a name="end" />
###end
Ends the session.
```javascript
this.browser
    .end()
    .then(callback);
```
-------------
<a name="deleteCookies" />
###deleteCookies
Delete all cookies visible to the current page.
```javascript
this.browser
    .deleteCookies()
    .then(callback);
```
-------------
<a name="deleteCookie" />
###deleteCookie
Delete the cookie with the given name.
```javascript
this.browser
    .deleteCookie('test_cookie')
    .then(callback);
```
-------------
<a name="closeWindow" />
###closeWindow
Close the current window.
```javascript
this.browser
    .closeWindow()
    .then(callback);
```
-------------
<a name="moveToObject" />
###moveToObject
Move the mouse by an offset of the specified element.
```javascript
this.browser
    .moveToObject('#main')
    .then(callback);
```
-------------
<a name="dragAndDrop" />
###dragAndDrop
function for performing a "drag and drop"
```javascript
this.browser
  .dragAndDrop('span.header-text:contains('from')', 'span.header-text:contains('to')')
  .then(callback);
```
-------------
<a name="setValue" />
###setValue
Sends some text to an element. Can be used to set the value of a form element or to send a sequence of key strokes to an element. Any UTF-8 character may be specified.
```javascript
this.browser
    .setValue('input[name="login"]', 'test_login')
    .then(callback);
```
-------------
<a name="waitForElementPresent" />
###waitForElementPresent
Waits for an element to be present in the page before performing any other commands or assertions. (Optional parameters: `timeout`)
```javascript
this.browser
    .waitForElementPresent('body', [timeout])
    .then(callback);
```
-------------
<a name="waitForElementNotPresent" />
###waitForElementNotPresent
Opposite of waitForElementPresent. Waits for an element to be not present (i.e. removed) in the page before performing any other commands or assertions. (Optional parameters: `timeout`)
```javascript
this.browser
    .waitForElementNotPresent('#dialog', [timeout])
    .then(callback);
```
-------------
<a name="waitForStatusByUrl" />
###waitForStatusByUrl
Waits for receive response HTTP status
```javascript
this.browser
    .waitForStatusByUrl('url', function (statusCode) {
        console.log(statusCode);
    })
    .then(callback);
```