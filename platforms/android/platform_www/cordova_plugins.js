cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "branch-cordova-sdk.Branch",
      "file": "plugins/branch-cordova-sdk/src/index.js",
      "pluginId": "branch-cordova-sdk",
      "clobbers": [
        "Branch"
      ]
    },
    {
      "id": "cordova-plugin-app-version.AppVersionPlugin",
      "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
      "pluginId": "cordova-plugin-app-version",
      "clobbers": [
        "cordova.getAppVersion"
      ]
    },
    {
      "id": "cordova-plugin-appmertica-push.appmetricapushplugin",
      "file": "plugins/cordova-plugin-appmertica-push/www/appmetricapushplugin.js",
      "pluginId": "cordova-plugin-appmertica-push",
      "clobbers": [
        "appMetricaPush"
      ]
    },
    {
      "id": "cordova-plugin-appsflyer-sdk.appsflyer",
      "file": "plugins/cordova-plugin-appsflyer-sdk/www/appsflyer.js",
      "pluginId": "cordova-plugin-appsflyer-sdk",
      "clobbers": [
        "window.plugins.appsFlyer"
      ]
    },
    {
      "id": "cordova-plugin-appsflyer-sdk.AppsFlyerError",
      "file": "plugins/cordova-plugin-appsflyer-sdk/www/AppsFlyerError.js",
      "pluginId": "cordova-plugin-appsflyer-sdk",
      "clobbers": [
        "AppsFlyerError"
      ]
    },
    {
      "id": "cordova-plugin-facebook4.FacebookConnectPlugin",
      "file": "plugins/cordova-plugin-facebook4/www/facebook-native.js",
      "pluginId": "cordova-plugin-facebook4",
      "clobbers": [
        "facebookConnectPlugin"
      ]
    },
    {
      "id": "cordova-plugin-idfa.Idfa",
      "file": "plugins/cordova-plugin-idfa/www/Idfa.js",
      "pluginId": "cordova-plugin-idfa",
      "merges": [
        "cordova.plugins.idfa"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "onesignal-cordova-plugin.OneSignal",
      "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
      "pluginId": "onesignal-cordova-plugin",
      "clobbers": [
        "OneSignal"
      ]
    },
    {
      "id": "yandex-appmetrica-plugin-cordova.appmetrica",
      "file": "plugins/yandex-appmetrica-plugin-cordova/www/appmetrica.js",
      "pluginId": "yandex-appmetrica-plugin-cordova",
      "clobbers": [
        "appMetrica"
      ]
    }
  ];
  module.exports.metadata = {
    "branch-cordova-sdk": "4.2.1",
    "cordova-plugin-app-version": "0.1.12",
    "cordova-plugin-appmertica-push": "0.8.0",
    "cordova-plugin-appsflyer-sdk": "6.1.11",
    "cordova-plugin-crypt-file": "1.3.3",
    "cordova-plugin-facebook4": "6.4.0",
    "cordova-support-android-plugin": "1.0.2",
    "cordova-plugin-idfa": "2.0.0",
    "cordova-plugin-inappbrowser": "4.0.1-dev",
    "cordova-plugin-webpack": "1.0.5",
    "cordova-plugin-whitelist": "1.3.4",
    "onesignal-cordova-plugin": "2.11.2",
    "yandex-appmetrica-plugin-cordova": "1.0.0"
  };
});