import { should } from 'chai';
import { defineSupportCode } from 'cucumber';
import * as Page from './../pages/util.page';

defineSupportCode(({ Given, Then, When }) => {
    Given(/^I navigate to the login page$/, () => {
        return Page.navigateToLoginPage();
    });

    When(/^I enter a username (.*)$/, (username: string) => {
        return Page.enterText('loginUsernameEntry', username);
    });

    When(/^I enter a password (.*)$/, (password: string) => {
        return Page.enterText('loginPasswordEntry', password);
    });

    Then(/^I should be able to login$/, () => {
        return Page.click('loginButton')
            .then(() => {
                return Page.getText('loginSuccessPopupTitle');
            })
            .then((text) => {
                should().equal(text, 'Congratulations!');
                return Page.click('loginSuccessPopupOk');
            })
            .then(() => {
                return Page.getText('welcomeTitleLabel');
            })
            .then((text) => {
                should().equal(text, 'Welcome');
            });
    });
});
