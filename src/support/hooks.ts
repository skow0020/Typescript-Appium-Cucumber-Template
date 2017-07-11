import { should } from 'chai';
import { defineSupportCode } from 'cucumber';
import * as webdriver from 'webdriverio';
import { localhost } from './config';

export let driver: webdriver.Client<webdriver.RawResult<null>>;
export let scenarioName: string;

const startDriver = (): Promise<any> => {
  const capability = require('./capabilities')[process.env.CAPABILITY]['capability'];

  should().not.equal(capability, undefined, 'Invalid capability was requested');

  const client = webdriver.remote({
    port: localhost.port,
    hostname: localhost.host,
    desiredCapabilities: capability
  });

  return new Promise((resolve, reject) => {
    driver = client.init();
    resolve(driver);
  });
};

const checkDriver = (): Promise<any> => {
  return new Promise((resolve, reject) => {
      if (driver === undefined) {
        return startDriver()
          .then(() => {
            resolve();
          });
      }
      return driver.status()
        .then((status: any) => {
          if (status.status === 0) {
            return driver.init();
          }
        })
        .then(() => {
          resolve();
        });
    });
};

const endDriverWithSnapshot = (scenario: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    return driver.saveScreenshot(`./run_results/${scenarioName}.png`)
      .then(() => {
        return driver.end();
      })
      .then(() => {
        resolve();
      });
  });
};

defineSupportCode(({ After, Before, registerHandler, setDefaultTimeout }) => {
  setDefaultTimeout(120000);

  registerHandler('AfterFeatures', (scenario: any) => {
    const reporter = require('cucumber-html-reporter');
    const options = {
      theme: 'bootstrap',
      jsonFile: 'run_results/results.json',
      output: 'run_results/results.html',
      metadata: {
        platform: process.env.CAPABILITY
      }
    };
    reporter.generate(options);
    return driver.end();
  });

  Before((scenario) => {
    scenarioName = scenario.scenario.name;
    scenarioName = scenarioName.replace(/ /g, '_');
    return checkDriver();
  });

  After(() => {
    driver.saveScreenshot(`./run_results/${scenarioName}.png`);
  });

  After('@loginPage', (scenario) => {
    return endDriverWithSnapshot(scenario);
  });

  After('@endUserAgreement', (scenario) => {
    return endDriverWithSnapshot(scenario);
  });

  After('@deviceCompatibility', (scenario) => {
    return endDriverWithSnapshot(scenario);
  });

  After('@connection', (scenario) => {
    return endDriverWithSnapshot(scenario);
  });

  After('@homePage', (scenario) => {
    return endDriverWithSnapshot(scenario);
  });

  After('@welcome', (scenario) => {
    return endDriverWithSnapshot(scenario);
  });
});
