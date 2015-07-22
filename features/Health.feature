Feature: Health feature

  @health @locale.fr
  Scenario: I want to see good health
    Given  I am on external host "https://twitter.com/"
    Then   status code should be 200
    Then   take screenshot