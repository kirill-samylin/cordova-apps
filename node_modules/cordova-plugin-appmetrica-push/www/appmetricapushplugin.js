"use strict";

function appMetricaPushExec(methodName, argsArray) {
    var className = 'appmetricapushplugin';
    cordova.exec(
        function () {},
        function (err) {
            console.warn('AppMetricaPush:cordova.exec(' +
                className + '.' + methodName + '): ' + err)
        },
        className,
        methodName,
        argsArray
    );
}


module.exports = {
    init: function () {
        appMetricaPushExec('init', []);
    }
};