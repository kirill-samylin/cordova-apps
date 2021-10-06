# instruction: Перед первым запуском выполнить chmod +x ./facebook/facebook.sh
#!/bin/bash

echo "START";

appname="Mystical Tomb"
fb_app_id="1789702304535740"
mydir=`pwd`; #way app

if ! [ -d $mydir/plugins/cordova-plugin-facebook4/ ]
    then #если плагина нет, то сначала устанавливаем
    echo "Install plugin cordova-plugin-facebook4";
    cordova plugin add cordova-plugin-facebook4@6.4.0 --variable APP_ID=$fb_app_id --variable APP_NAME=$appname
fi

cp $mydir/facebook/ConnectPlugin.java $mydir/platforms/android/app/src/main/java/org/apache/cordova/facebook/ConnectPlugin.java
cp $mydir/facebook/facebook-native.js $mydir/platforms/android/platform_www/plugins/cordova-plugin-facebook4/www/facebook-native.js

echo "END";
