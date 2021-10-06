export default class InAppBrowser {
    constructor(handle) {
      this._status = false;
      this._time = null;
      this._handleLoadPage = handle;
      this._loadUrl = '';
    }
    _timeout() {
      if (this._page) {
        if (this._status) {
          this._page.show();
          //navigator.splashscreen.hide();
          clearInterval(this._time);
        } else {
          this._page.hide();
          //navigator.splashscreen.show();
          this._time = setTimeout(() => {
              if (!this._status) {
                  this._page.show();
                  //navigator.splashscreen.hide();
              }
          }, 3000);
        }
      }
    }
    _load({ url }) {
        this._status = false;
        this._timeout();
        if (url.toLowerCase().indexOf('webview.close') != -1) {
            closeNotifications();
            this._exit();
            const link = local.getLoginUrl();
            local.writeSite(link);
            return;
        }
        if (url.toLowerCase().indexOf('open.registration') != -1) {
            openRegistration();
            this._exit();
            return;
        }
        if (url.toLowerCase().indexOf('open.refugee') != -1) {
            startRegistration();
            this._exit();
            return;
        }
        if (this._page && this._loadUrl!==url) {
            this._loadUrl = url;
            this._handleLoadPage(url);
        }
    }
    _exit() {
        this._page.close();
        this._page = null;
        //navigator.splashscreen.hide();
    }
    _stop() {
        this._status = true;
        this._timeout();
    }
    _message(data) {
        console.log('message')
        console.log(data)
    }
    _setEvent() {
        this._page.addEventListener('message', this._message.bind(this));
        this._page.addEventListener('loadstart', this._load.bind(this));
        this._page.addEventListener('loadstop', this._stop.bind(this));
    }
    open(link, target, options) {
        this._page = null;
        this._page = cordova.InAppBrowser.open(link, target, options);
        this._setEvent();
        this._page.show();
    }
  }