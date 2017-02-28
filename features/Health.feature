Feature: Health feature

  @health
  Scenario: I want to see good health
    Given  I am on external host "https://twitter.com/"
    Then   take screenshot
