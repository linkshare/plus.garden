Writing Features and Definitions
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