Feature: Crm framework for creating lead module
    @Regression
    Scenario Outline: Creating leads module after login into crm
    Given Login to crm tool with "admin" and "admin" and "http://49.249.28.218:8888/" is
    When home page is displayed
    Then Click on leads page and click on plus icon to create leads profile
    When leads profile page is open
    Then fill all the mandatory fields with "<lastname>" and "<title>"  and click on submit button
    When leads profile is saved and verified 
    Then Logout from crm

    Examples:
        | lastname |   title   |
        | katoch   |   tester  |
        | chauhan  | developer |