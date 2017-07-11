import { defineSupportCode, } from 'cucumber';
import * as Page from './../pages/util.page';

defineSupportCode(({ Given, When, Then }) => {
    When(/^I click \'(.*)\'$/, (element: string) => {
        Page.click(element)
    })

    When(/^I send the app to the background and reopen it$/, () => {
        Page.backgroundAndBackUp()
    })

    Then(/^I can access the \'(.*)\' page$/, (page: string) => {
        Page.navigateTo(page)
    })

    When(/^I switch to landscape mode$/, () => {
        Page.rotate('landscape')
    })

    When(/^I switch to portrait mode$/, () => {
        Page.rotate('portrait')
    })

    Then(/^the app reopens in landscape mode$/, () => {
        Page.verifyLandscapeOrientation()
    })

    Given(/^I set the language to \'(.*)\'$/, (language: string) => {
        Page.setLanguage(language)
    })
});
