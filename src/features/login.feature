@loginPage
Feature: Login

@loginPageLogin
    Scenario Outline: Verify login capabilities
    Given I navigate to the login page
    When I enter a username <username>
    And I enter a password <password>
    Then I should be able to login
Scenarios: Login Scenario
| username             | password |
| test.tapqa@tapqa.com | Test@123 |
