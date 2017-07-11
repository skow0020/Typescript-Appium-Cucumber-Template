# Typescript-Appium-Cucumber-Template
Typescript Appium Cucumber template for automating Android apps

# Automation Framework Setup

### Test Machine Configuration
1. Install [git bash](https://git-scm.com/downloads)
2. Enable Developer mode on machine
    * Note: This may require windows updates
    * [Microsoft: Enable your device for development](https://docs.microsoft.com/en-us/windows/uwp/get-started/enable-your-device-for-development)
    * [Developer Mode in Windows 10](https://www.ghacks.net/2015/06/13/how-to-enable-developer-mode-in-windows-10-to-sideload-apps/)

3. Install [NodeJS](https://nodejs.org/en/)
4. Install [npm](https://www.npmjs.com/package/npm)
5. Upgrade npm ``` npm -g install npm ```
6. Install [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 
7. Set JAVA_HOME environment variable
8. Install [Android Studio](https://developer.android.com/studio/index.html)
9. Set ANDROID_HOME environment variable (if not set already). Point to the Android/SDK directory ([more info](https://developer.android.com/studio/index.html)) 

## Project Configuration 
1. Navigate to project directory
2. Install project node modules: ``` npm install ```
3. A new node_modules directory should now exist in project root
5. Below is an example of running tests on an Android Samsung Device device: 
    ``` 
      # while in project root directory
      npm run test:Android
    ```

## Mobile Device Configuration

### Android
1. Enable debug on the Android phone (Settings > Developer Options)
2. Get its device id by running the following command:
    ``` adb devices```
4. Add/modify capability and npm scripts for device
    - Add an entry for the device to /src/support/capabilities.json (or modify an existing entry)
    - If necessary, add an npm script to package.json. For example:
        ```json 
          "test:newAndroid": "bnr test:newAndroid -s"
        ```
    - If necessary, add a betterScripts entry to package.json. For example:
      ```json 
        "test:newAndroid": {
          "command": " appium-controller --start && wdio appium-controller --stop",
          "env": {
            "CAPABILITY": "newAndroid"
          }
        }
      ```
      NOTE: Parameterization of device name and udid is a possibility here.

### iOS
May or may not be coming soon.

