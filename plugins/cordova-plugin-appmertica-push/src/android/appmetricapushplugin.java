package com.yandex.metrica.plugin.cordova;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.yandex.metrica.push.YandexMetricaPush;
import com.yandex.metrica.YandexMetrica;
import com.yandex.metrica.YandexMetricaConfig;
import android.content.Context;
/**
 * This class echoes a string called from JavaScript.
 */
public class appmetricapushplugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("init".equals(action)) {
            final Context context = cordova.getActivity().getApplicationContext();
            YandexMetricaPush.init(context);
        } else {
            callbackContext.error("Unknown action: " + action);
        }
        return true;
    }
}
