const capability = require('./../src/support/capabilities')[process.env.CAPABILITY];
import { localhost } from './../src/support/config';
import * as webdriver from 'webdriverio';

if (capability.type === 'device') {
    const client = webdriver.remote({
        port: localhost.port,
        hostname: localhost.host,
        desiredCapabilities: capability.capability
    });

    client.init().removeApp('app');
    client.end();
}
