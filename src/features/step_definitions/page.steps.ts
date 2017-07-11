import { defineSupportCode, } from 'cucumber';
import * as Page from './../pages/util.page';

defineSupportCode(({ Given, When, Then }) => {
    When(/^I click \'(.*)\'$/, (element: string) => {
        Page.click(element)
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
});
