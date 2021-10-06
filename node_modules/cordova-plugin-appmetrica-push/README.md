# Добавление плагина

1. Добавить плагин
> cordova plugin add https://github.com/R-B-AGroup/cordova-plugin-appmetrica-push
2. Зайти в Firebase -> Project settings и скачать у проекта файл `google-services.json`.
3. Открыть `AndroidManifest.xml` (C:\ ...\папка проекта\platforms\android\app\src\main).
4. Добавить строки внутри тэга `<application>`  :
```xml
<meta-data android:name="ymp_firebase_default_app_id" android:value="mobilesdk_app_id"/>
<meta-data android:name="ymp_gcm_default_sender_id" android:value="number:project_number"/>
<meta-data android:name="ymp_firebase_default_api_key" android:value="current_key"/>
<meta-data android:name="ymp_firebase_default_project_id" android:value="project_id"/>
```
5. Вместо полей `mobilesdk_app_id`, `project_number`, `current_key`, `project_id` выставить соответствующие значения из `google-services.json` файла.

### !!! при переустановке платформы эти ключи стираются и их нужно добавить заново.

## Системные требования
Cordova: версия не ниже 10.
