Writing Features and Definitions
-------------

Features are written with the [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin)

A Gherkin source file usually looks like this

```gherkin
  Feature: Some terse yet descriptive text of what is desired
    Textual description of the business value of this feature
    Business rules that govern the scope of the feature
    Any additional information that will make the feature easier to understand

    Scenario: Some determinable business situation
      Given some precondition
      And some other precondition
      When some action by the actor
      And some other action
      And yet another action
      Then some testable outcome is achieved
      And something else we can check happens too
```

### Demo feature definition

```javascript
    Given(/^I login with username "([^"]*)" and password "([^"]*)"$/, function(username, password, callback) {
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

### Special Tags

  * *@fixtures.load*: Running fixture loaders before Scenario
  * *@fixtures.drop*: Drop fixtures before Scenario
  * *@webdriver.init*: Running browser session before Scenario
  * *@webdriver.quit*: Closes all browser windows and safely ends the session after Scenario
