import * as glob from 'glob';
import * as _ from 'lodash';
import * as path from 'path';
const fs = require('fs')
import { assert } from 'chai'
import * as webdriver from 'webdriverio';
import constants from './../../support/constants';
import { driver } from './../../support/hooks';

export const selectors = {
    openWithChrome: 'android=new UiSelector().text("Chrome")',
    openWithAlways: 'buttonAlways',
};

const getSelectors = () => {
    const select = glob.sync(path.join(__dirname, '/*.page.ts')).map((elem) => {
        return require(elem).selectors;
    });

    return _.reduce(select, (result, value) => {
        return _.merge(result, value);
    }, {});
};

export const allSelectors: any = getSelectors();

// ---------------------------------------General Methods---------------------------------------------------

export const click = (element: string): Promise<webdriver.RawResult<any>> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], constants.DEFAULT_SEC)
            .click(allSelectors[element])
            .then((value) => {
                resolve(value);
            })
            .catch((err: Error) => {
                reject(err);
            });
    });
};

export const clickChildElement = (parent: string, element: string): Promise<webdriver.RawResult<any>> => {
    return new Promise((resolve, reject) => {
        return driver
            .element(parent)
            .click(allSelectors[element])
            .then((value) => {
                resolve(value);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const enterText = (element: string, value: string): Promise<webdriver.RawResult<any>> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], constants.DEFAULT_SEC)
            .setValue(allSelectors[element], value)
            .then((v) => {
                resolve(v);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const clearText = (element: string): Promise<webdriver.RawResult<any>> => {
    return new Promise((resolve, reject) => {
        return driver.setValue(allSelectors[element], '')
            .then((v) => {
                resolve(v);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getContentDesc = (element: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], constants.DEFAULT_SEC)
            .getAttribute(allSelectors[element], 'content-desc')
            .then((contentdesc) => {
                resolve(contentdesc);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getText = (element: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], constants.DEFAULT_SEC)
            .getText(allSelectors[element])
            .then((text) => {
                resolve(text);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getResourceId = (element: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], constants.DEFAULT_SEC)
            .getAttribute(allSelectors[element], 'resource-id')
            .then((id) => {
                resolve(id);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const getClassName = (element: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], constants.DEFAULT_SEC)
            .getAttribute(allSelectors[element], 'class')
            .then((className) => {
                resolve(className);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const waitForExistence = (element: string, waitTime: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], waitTime)
            .then((visible) => {
                resolve(visible);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const waitForNonExistence = (element: string, waitTime: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .waitForExist(allSelectors[element], waitTime, true)
            .then((visible) => {
                resolve(visible);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const isVisibleElement = (element: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .isVisible(allSelectors[element])
            .then((visible) => {
                resolve(visible);
            })
            .catch((err) => {
                reject(err);
                throw err;
            });
    });
};

export const isEnabled = (element: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .isEnabled(allSelectors[element])
            .then((enabled) => {
                resolve(enabled);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const isVisibleWithinView = (element: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .isVisibleWithinViewport(allSelectors[element])
            .then((focused) => {
                resolve(focused);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const isSelected = (element: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .isSelected(allSelectors[element])
            .then((selected) => {
                resolve(selected);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const isChecked = (element: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        return driver
            .getAttribute(allSelectors[element], 'checked')
            .then((checked) => {
                const isTrueSet = (checked === 'true');
                resolve(isTrueSet);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
 * Click element by webElementID
 * @param element
 */
export const clickElement = (element: string, errorMsg: string = null, waitTime = constants.DEFAULT_SEC) => {
    waitForElement(allSelectors[element], `Element not found to be clicked: ${element}`, waitTime)
    driver.click(allSelectors[element])
}

/**
 * Swipe down on an element a provided number of times
 * @param element
 * @param numOfSwipes
 */
export const swipeDown = (element: string, numOfSwipes: number) => {
    swipe(driver.element(allSelectors[element]), 0, 80, numOfSwipes)
}

/**
 * Swipe up on an element a provided number of times
 * @param element
 * @param numOfSwipes
 */
export const swipeUp = (element: string, numOfSwipes: number) => {
    swipe(driver.element(allSelectors[element]), 0, -80, numOfSwipes)
}

/**
 * Swipe up on an element a provided number of times
 * @param element
 * @param numOfSwipes
 */
export const longSwipeUp = (element: string, numOfSwipes: number) => {
    try {
        let i = 1;
        while (i <= numOfSwipes) {
            driver.swipe(allSelectors[element], 0, -5000, 200)
            i++
        }
    }
    catch (err) { assert.isTrue(false, `Failed to swipe on element '${element}'`) }
}

/**
 * Swipe right on an element a provided number of times
 * @param element
 * @param numOfSwipes
 */
export const swipeRight = (element: string, numOfSwipes: number) => {
    swipe(driver.element(element), 500, 0, numOfSwipes)
}

/**
 * Swipe left on an element a provided number of times
 * @param element
 * @param numOfSwipes
 */
export const swipeLeft = (element: string, numOfSwipes: number) => {
    swipe(driver.element(element), -500, 0, numOfSwipes)
}

export const swipe = (element: WebdriverIO.RawResult<WebdriverIO.Element>, xOffset: number, yoffset: number, numOfSwipes: number) => {
    try {
        let i = 1;
        while (i <= numOfSwipes) {
            driver.swipe(element.selector, xOffset, yoffset, 200)
            driver.pause(500)
            i++
        }
    }
    catch (err) { assert.isTrue(false, `getElement not implemented for: '${element}'. ${err}`) }
}

export const verifyNavigationBarTitle = (page: string) => {
    this.waitForElement(this.navBarTitle, 'Page title bar did not display')
    this.assertElementText(this.navBarTitle.getText(), page)
}

export const waitForElement = (elementID: string, errMsg: string = null, waitTime = constants.DEFAULT_SEC) => {
    if (errMsg === null) { errMsg = `Could not find element` }
    driver.waitUntil(() => {
        return driver.isExisting(elementID)
    }, waitTime, errMsg);
}

export const waitForElementNotExist = (elementID: string, errMsg: string = null, waitTime = constants.DEFAULT_SEC) => {
    if (errMsg === null) { errMsg = `An element unexpectedly continued to exist on page` }
    driver.waitUntil(() => {
        return !driver.isExisting(elementID)
    }, waitTime, errMsg);
}

/**
 * General assertion for errors on verifying element text
 * @param expectedValue
 * @param actualValue
 */
export const assertElementText = (actualValue: string, expectedValue: string) => {
    assert.equal(actualValue, expectedValue, `FAILURE: Expected value '${expectedValue}' did not match actual value '${actualValue}'`)
}

/**
 * General assertion for errors on verifying element text contains
 * @param expectedValue
 * @param actualValue
 */
export const assertElementTextContains = (expectedValue: string, actualValue: string) => {
    assert.include(actualValue, expectedValue, `FAIURE: Expected value '${expectedValue}' was not contained in value '${actualValue}'`)
}

/**
 * General assertion for errors on element visisbility
 * @param visible: The isVisible() method run on the element
 * @param element: Element description
 */
export const assertElementVisible = (element: WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>>, errorMsg: string = null) => {
    if (!errorMsg) { errorMsg = `Element was not visible: ${element.getText()}` }
    assert.isTrue(element.isVisible(), errorMsg)
}

/**
 * Changes the app orientation
 * @param orientation
 */
export const rotate = (orientation: string) => {
    if (orientation === 'landscape') { driver.setOrientation("landscape") }
    else if (orientation === 'portriat') { driver.setOrientation("portrait") }
}

/**
 * Verifies landscape app orientation
 * @param orientation
 */
export const verifyLandscapeOrientation = () => {
    const orientation = driver.getOrientation().getValue()
    assert.isTrue(orientation === 'landscape', 'Orientation was not landscape')
}

/**
 * Format date for filename
 */
export const formatDateForFileName = (date: Date) => {
    return `${constants.weekdayNames[date.getDay()]}-${constants.monthNames[date.getMonth()]}-${date.getDate()}-${date.getHours()}H${date.getMinutes()}M${date.getSeconds()}S`
}

/**
 * Format date object example: Friday, June 09, 2017
 * @param date
 */
export const formatDateDMY = (date: Date) => {
    const day = (date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`);
    return `${constants.weekdayNames[date.getDay()]}, ${constants.monthNames[date.getMonth()]} ${day}, ${date.getFullYear()}`
}

/**
 * Format date object example: Friday, June 09
 * @param date
 */
export const formatDateDM = (date: Date) => {
    const day = (date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`);
    return `${constants.weekdayNames[date.getDay()]}, ${constants.monthNames[date.getMonth()]} ${day}`
}

export const getScreenshotDirectory = () => {
    let languageScreenshotDir = `${constants.SCREENSHOT_DIR}`
    if (!fs.existsSync(languageScreenshotDir)) { fs.mkdirSync(languageScreenshotDir) }
    languageScreenshotDir = `${constants.SCREENSHOT_DIR}/${process.env.FEATURE_NAME}`
    if (!fs.existsSync(languageScreenshotDir)) { fs.mkdirSync(languageScreenshotDir) }
    return languageScreenshotDir
}

export const navigateToLoginPage = () => {
    //TO BE COMPLETED
}
export default selectors;
