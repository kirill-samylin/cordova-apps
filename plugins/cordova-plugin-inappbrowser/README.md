# cordova-plugin-inappbrowser
Плагин собран на основе [cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser)

### Доступные версии:
 * 2.0
 * 3.2
 * 4.0

## Установка
```npm
cordova plugin add https://github.com/R-B-AGroup/mobile_cordova_plugin_inappbrowser.git
```
или с версией:
```npm
cordova plugin add https://github.com/R-B-AGroup/mobile_cordova_plugin_inappbrowser.git#4.0
```
## Удаление
```npm
cordova plugin remove cordova-plugin-inappbrowser
```
## Измененный функционал

 * `options` Строка пар имя=значение должны быть отделены друг от друга знаком &&.
 * Изменены параметры для InAppBrowser по умолчанию: location=no&&hidenavigationbuttons=yes&&hideurlbar=yes.
 * Кнопка "назад" при остусвии истории InAppBrowser закрывает приложение.

## Добавленный функционал

- __useragent__: Дополнительная опция для установка user-agent. Пример: 
```js
const options = 'location=no&&zoom=no&&footer=no&&hidenavigationbuttons=yes&&hideurlbar=yes&&hidden=yes&&hardwareback=no&&useragent=Mozilla/5.0 (Linux; U; Android 7.0; en-us; MI 5 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.146 Mobile Safari/537.36 XiaoMi/MiuiBrowser/9.0.3';
cordova.InAppBrowser.open(url, '_blank', options);
```

#### Автор: Кирилл Самылин.