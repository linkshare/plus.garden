/* =================================================================================
 * @author Vladimir Polyakov
 * @author Slava Hatnuke
 * =================================================================================
 * Copyright (c) 2015 Rakuten Marketing
 * Licensed under MIT (https://github.com/linkshare/plus.garden/blob/master/LICENSE)
 * ============================================================================== */

var Browser = function (driver, $, logger, options) {

    if (!driver) return;

    this.driver = driver;
    this.logger = logger;
    this.$ = $;

    this.chai = require('chai');
    this.async = require('async');
    this.fs = require('fs');
    this.jdiff = require('json-diff');
    this.colorize = require('json-diff/lib/colorize');
    this.proxy = null;
    this.host = 'localhost';
    this.waitTimeout = 10000;


    require('merge')(this, options || {});

    this.getElements = function (cssSelector) {
        return this.$.all(cssSelector);
    };

    this.getElement = function (cssSelector) {
        return this.$(cssSelector);
    };

}

Browser.prototype = {

    then: function (next) {
        next();
    },

    visit: function (url, next) {
        this.logger.debug('visit: ' + url);
        this.driver.get(this.host + url).then(next);
    },

    visitExternal: function (url, next) {
        this.logger.debug('visitExternal: ' + url);
        this.driver.get(url).then(next);
    },

    waitForStatusByUrl: function (url, next) {
        this.logger.debug('waitForStatusByUrl: ' + url);
        var delay = 100;
        var count = 0;
        this.async.whilst(
            function () {
                return count < this.waitTimeout;
            }.bind(this),
            function (callback) {
                this.proxy.getStatusByUrl(url, function (err, givenStatus) {
                    if (!err) {
                        next(givenStatus);
                    } else {
                        count = count + delay;
                        setTimeout(callback, delay);
                    }
                });
            }.bind(this),
            function (err) {
                next();
            }
        );
    },

    getMetaByUrl: function (url, next) {
        this.logger.debug('getMetaByUrl: ' + url);
        var delay = 100;
        var count = 0;
        this.async.whilst(
            function () {
                return count < this.waitTimeout;
            }.bind(this),
            function (callback) {
                this.proxy.getMetaByUrl(url, function (err, meta) {
                    if (!err) {
                        next(meta);
                    } else {
                        count = count + delay;
                        setTimeout(callback, delay);
                    }
                });
            }.bind(this),
            function (err) {
                next();
            }
        );
    },

    waitForElementPresent: function (cssSelector, timeout, next) {
        if (typeof timeout == 'function') {
            next = timeout;
            timeout = this.waitTimeout;
        }

        this.driver.wait(function () {
            return this.getElements(cssSelector).then(function (elements) {
                return elements.length > 0;
            })
        }.bind(this), timeout || this.waitTimeout).then(function () {
            next();
        }, function () {
            this.chai.assert(false, 'I should see: ' + cssSelector);
            next();
        }.bind(this));
    },

    waitForElementNotPresent: function (cssSelector, timeout, next) {
        if (typeof timeout == 'function') {
            next = timeout;
            timeout = this.waitTimeout;
        }

        this.driver.wait(function () {
            return this.getElements(cssSelector).then(function (elements) {
                return elements.length == 0;
            })
        }.bind(this), timeout || this.waitTimeout).then(function () {
            next();
        }, function () {
            this.chai.assert(false, 'I should not see: ' + cssSelector);
            next();
        }.bind(this));
    },

    assertStatusByUrl: function (url, expectedStatus, next) {
        this.logger.debug('assertStatusByUrl: ' + url + ' expectedStauts' + expectedStatus);
        this.waitForStatusByUrl(url, function (status) {
            if (status == expectedStatus) {
                next();
            } else {
                this.chai.assert(false, 'status code should be: "' + expectedStatus + '" but given: ' + status);
            }
        });

    },

    assertTitle: function (expectedTitle, next) {
        this.logger.debug('assertTitle: ' + expectedTitle);
        this.driver.getTitle().then(function (title) {
            if (expectedTitle == title) {
                next();
            } else {
                this.chai.assert(false, "expected title: " + expectedTitle + ', got: ' + title);
            }
        }.bind(this))
    },

    assertContainsText: function (cssSelector, expectedText, next) {
        this.logger.debug('assertContainsText: ' + expectedText + ' cssSelector' + cssSelector);
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).getText().then(function (text) {
                if (text.indexOf(expectedText) > -1) {
                    next();
                } else {
                    this.chai.assert(false, 'given text: "' + text + '" not contains text: "' + expectedText + '"');
                }
            }.bind(this));
        }.bind(this));
    },

    assertListContains: function (cssSelector, expectedText, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
              this.async.some(elements, function (element, callback) {
                    element.getText().then(function (text) {
                        if (text == expectedText) {
                          callback(true);
                        } else {
                          callback(false);
                        }
                    })
                }, function (found) {
                    if (!found) {
                      this.chai.assert(false, 'list: "' + cssSelector + '" should contains at least one element with: "' + expectedText + '"');
                    }
                    next();
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    assertListContainsOnly: function (cssSelector, expectedText, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                this.async.each(elements, function (element, callback) {
                    element.getText().then(function (text) {
                        if (text.indexOf(expectedText) > -1) {
                            callback();
                        } else {
                            this.chai.assert(false, 'element: "' + cssSelector + '" should contains only "' + expectedText + '" but was found:' + text);
                        }
                    }.bind(this))
                }.bind(this), next);
            }.bind(this));
        }.bind(this));
    },

    assertListNotContains: function (cssSelector, expectedText, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                this.async.each(elements, function (element, callback) {
                    element.getText().then(function (text) {
                        if (text == expectedText) {
                            this.chai.assert(false, 'element: "' + cssSelector + '" should not contains: "' + expectedText + '"');
                        } else {
                            callback();
                        }
                    }.bind(this))
                }, function () {
                    next();
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    assertListEquals: function (cssSelector, expectedlist, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                var givenList = [];
                this.async.each(elements, function (element, callback) {
                    element.getText().then(function (text) {
                        givenList.push(text);
                        callback();
                    })
                }, function () {
                    var diff = this.jdiff.diff(expectedlist, givenList);
                    if (diff) {
                        this.chai.assert(false, 'lists are not match \n' + this.colorize.colorize(diff));
                    }
                    next();
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    assertCssClassPresent: function (cssSelector, className, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).getAttribute('class').then(function (classAttribute) {
                if (classAttribute.split(/\s+/).indexOf(className) > -1) {
                    next();
                } else {
                    this.chai.assert(false, 'element: "' + cssSelector + '" not present class: "' + className + '"');
                }
            }.bind(this));
        }.bind(this));
    },

    assertCssClassNotPresent: function (cssSelector, className, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).getAttribute('class').then(function (classAttribute) {
                if (classAttribute.split(/\s+/).indexOf(className) > -1) {
                    this.chai.assert(false, 'element: "' + cssSelector + '" present class: "' + className + '"');
                } else {
                    next();
                }
            }.bind(this));
        }.bind(this));
    },

    assertCssProperty: function (cssSelector, property, expectedValue, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).getCssValue(property).then(function (value) {
                if (expectedValue == value) {
                    next();
                } else {
                    this.chai.assert(false, 'given value: "' + value + '" not equals: "' + expectedValue + '"');
                }
            }.bind(this));
        }.bind(this));
    },

    assertUrlContains: function (text, next) {
        this.driver.getCurrentUrl().then(function (url) {
            if (url.indexOf(text) > -1) {
                next();
            } else {
                this.chai.assert(false, "url should contains text: " + text);
            }
        }.bind(this));
    },

    assertUrlEquals: function (expectedUrl, next) {
        this.driver.getCurrentUrl().then(function (url) {
            if (url == expectedUrl) {
                next();
            } else {
                this.chai.assert(false, 'url given: "' + url + '" expected url: "' + expectedUrl + '"');
            }
        }.bind(this));
    },

    assertElementPresent: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector).then(next);
    },

    assertElementNotPresent: function (cssSelector, next) {
        this.waitForElementNotPresent(cssSelector).then(next);
    },

    assertValue: function (cssSelector, expectedValue, next) {
        this.getValue(cssSelector, function (value) {
            if (value == expectedValue) {
                next();
            } else {
                this.chai.assert(false, "expected value: " + expectedValue + ", got: " + value);
            }
        }.bind(this));
    },

    assertValueContains: function (cssSelector, text, next) {
        this.getValue(cssSelector, function (value) {
            if (value.indexOf(text) > -1) {
                next();
            } else {
                this.chai.assert(false, "element: " + cssSelector + " should contains: " + text);
            }
        }.bind(this));
    },

    assertStatus: function (expectedStatus, next) {
        this.driver.getCurrentUrl().then(function (url) {
            url = url.substr(0, url.indexOf('#')) || url;
            this.proxy.getStatusByUrl(url, function (err, givenStatus) {
                this.logger.debug('assertStatus for current url: ' + url + ', expectedStauts: ' + expectedStatus);

                if (err) {
                    throw new Error(err);
                }

                this.chai.assert(expectedStatus == givenStatus, "expected status: " + expectedStatus + ', got: ' + givenStatus);
                next();
            }.bind(this));
        }.bind(this));
    },

    assertVisible: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).isDisplayed().then(function (isDisplayed) {
                if (isDisplayed) {
                    next();
                } else {
                    this.chai.assert(false, 'element: "' + cssSelector + '" is not visible');
                }
            }.bind(this));
        }.bind(this));
    },

    assertHidden: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).isDisplayed().then(function (isDisplayed) {
                if (!isDisplayed) {
                    next();
                } else {
                    this.chai.assert(false, 'element: "' + cssSelector + '" is visible');
                }
            }.bind(this));
        }.bind(this));
    },

    assertAttributeEquals: function (cssSelector, attribute, expected, next) {
        this.getAttribute(cssSelector, attribute, function (value) {
            this.chai.assert.equal(expected, value);
            next();
        })
    },

    assertElementsMoreThan: function (cssSelector, expectedQty, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                if (elements.length > expectedQty) {
                    next();
                } else {
                    this.chai.assert(false, 'elements count should be more then "' + expectedQty + '" but given: ' + elements.length);
                }
            }.bind(this));
        }.bind(this));
    },

    assertElementsLessThan: function (cssSelector, expectedQty, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                if (elements.length < expectedQty) {
                    next();
                } else {
                    this.chai.assert(false, 'elements count should be less then "' + expectedQty + '" but given: ' + elements.length);
                }
            }.bind(this));
        }.bind(this));
    },

    assertElementsEquals: function (cssSelector, expectedQty, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                if (elements.length == expectedQty) {
                    next();
                } else {
                    this.chai.assert(false, 'elements count should be: "' + expectedQty + '" but given: ' + elements.length);
                }
            }.bind(this));
        }.bind(this));
    },

    setValue: function (cssSelector, value, next) {
        this.clearValue(cssSelector).then(function() {
            this.logger.debug('setValue: ' + value + ', ' + cssSelector);
            this.getElement(cssSelector).sendKeys(value).then(next);
        }.bind(this));
    },

    getValue: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).getAttribute('value').then(function (value) {
                next(value);
            }.bind(this));
        }.bind(this));
    },

    getAttribute: function (cssSelector, attribute, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).getAttribute(attribute).then(function (value) {
                next(value);
            }.bind(this));
        }.bind(this));
    },

    click: function (cssSelector, next) {
        this.logger.debug('click: ' + cssSelector);
        this.waitForElementVisible(cssSelector).then(function () {
            this.getElement(cssSelector).click().then(function () {
                next();
            });
        }.bind(this));
    },

    moveToObject: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).then(function (element) {
                this.driver.actions().mouseMove(element).perform().then(next);
            }.bind(this));
        }.bind(this));
    },

    clearValue: function (cssSelector, next) {
        this.logger.debug('clear: ' + cssSelector);
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElement(cssSelector).clear().then(next);
        }.bind(this));
    },

    closeWindow: function (next) {
        this.driver
            .close()
            .then(next);
    },

    deleteCookie: function (cookieName, next) {
        this.driver
            .manage()
            .deleteCookie(cookieName)
            .then(next);
    },

    deleteCookies: function (next) {
        this.driver
            .manage()
            .deleteAllCookies()
            .then(next);
    },

    end: function (next) {
        this.driver
            .quit()
            .then(next);
    },

    getCookie: function (name, next) {
        this.driver
            .manage()
            .getCookie(name)
            .then(next);
    },

    getCookies: function (next) {
        this.driver
            .manage()
            .getCookies()
            .then(next);
    },

    getCssProperty: function (cssSelector, property, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .getCssValue(property)
                    .then(next);
            }.bind(this));
    },

    getElementSize: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .getSize()
                    .then(next);
            }.bind(this));
    },

    getLocation: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .getLocation()
                    .then(next);
            }.bind(this));
    },

    getTagName: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .getTagName()
                    .then(next);
            }.bind(this));
    },

    getText: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .getText()
                    .then(next);
            }.bind(this));
    },

    getElementsText: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector).then(function () {
            this.getElements(cssSelector).then(function (elements) {
                var givenList = [];
                this.async.each(elements, function (element, callback) {
                    element.getText().then(function (text) {
                        givenList.push(text);
                        callback();
                    })
                }, function () {
                    next(givenList);
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    getTitle: function (next) {
        this.driver
            .getTitle()
            .then(next);
    },

    isVisible: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .isDisplayed()
                    .then(next);
            }.bind(this));
    },

    pause: function (ms, next) {
        setTimeout(function () {
            next();
        }, ms);
    },

    getWindowSize: function (next) {
        this.driver
            .manage()
            .window()
            .getSize()
            .then(next);
    },

    resizeWindow: function (width, height, next) {
        this.driver
            .manage()
            .window()
            .setSize(width, height)
            .then(next);
    },

    maximizeWindow: function (next) {
        this.driver
            .manage()
            .window()
            .maximize()
            .then(next);
    },

    saveScreenshot: function (filename, next) {
        this.driver
            .takeScreenshot()
            .then(function (data) {
                var bitmap = new Buffer(data, 'base64');
                this.fs.writeFileSync(filename, bitmap);
                next();
            }.bind(this));
    },

    setCookie: function (cookie, next) {
        this.driver
            .manage()
            .addCookie(
            cookie['name'],
            cookie['value'],
            cookie['path'],
            cookie['domain'],
            cookie['secure'],
            cookie['expiry']
        )
            .then(next);
    },

    submitForm: function (cssSelector, next) {
        this.waitForElementPresent(cssSelector)
            .then(function () {
                this.getElement(cssSelector)
                    .submit()
                    .then(next);
            }.bind(this));
    },

    urlHash: function (hash, next) {
        this.driver
            .executeScript(function (hash) {
                window.location.hash = hash;
            }, hash)
            .then(next);
    },

    waitForElementVisible: function (cssSelector, timeout, next) {
        if (typeof timeout == 'function') {
            next = timeout;
            timeout = this.waitTimeout;
        }

        this.waitForElementPresent(cssSelector, timeout, function () {
            this.driver
                .wait(
                function () {
                    return this
                        .getElement(cssSelector)
                        .isDisplayed()
                        .then(function (displayed) {
                            return displayed;
                        })
                }.bind(this),
                timeout || this.waitTimeout
            )
                .then(
                function () {
                    next();
                },
                function () {
                    this.chai.assert(false, 'I should see: ' + cssSelector);
                    next();
                }.bind(this)
            );
        }.bind(this));
    },

    waitForElementNotVisible: function (cssSelector, timeout, next) {
        if (typeof timeout == 'function') {
            next = timeout;
            timeout = this.waitTimeout;
        }

        this.waitForElementPresent(cssSelector, timeout, function () {
            this.driver
                .wait(function () {
                    return this
                        .getElement(cssSelector)
                        .isDisplayed()
                        .then(function (displayed) {
                            return !displayed;
                        })
                }.bind(this),
                timeout || this.waitTimeout
            )
                .then(
                function () {
                    next();
                },
                function () {
                    this.chai.assert(false, 'I should not see: ' + cssSelector);
                    next();
                }.bind(this)
            );
        }.bind(this));
    },

    getCurrentUrl: function (next) {
        this.driver
            .getCurrentUrl()
            .then(next);
    },

    refreshPage: function(next) {
        this.driver
            .navigate()
            .refresh()
            .then(next);
    },

    dragAndDrop: function (from, to, next) {
        this.logger.debug('dragAndDrop: from: ' + from + ' to: ' + to);
        this.waitForElementVisible(from).then(function () {
            this.getElement(from).then(function (element) {
                this.driver.actions().mouseDown(element).perform().then(function () {
                    this.driver.actions().mouseMove({x: 100, y: 0}).perform().then(function () {
                        this.getElement('body').then(function (body) {
                            this.driver.actions().mouseMove(body).perform().then(function () {
                                this.waitForElementVisible(to).then(function () {
                                    this.getElement(to).then(function (elementTo) {
                                        this.driver.actions().mouseMove(elementTo).perform().then(function () {
                                            this.driver.actions().mouseUp().perform().then(next)
                                        }.bind(this));
                                    }.bind(this));
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this));
    }
}

module.exports = Browser;
