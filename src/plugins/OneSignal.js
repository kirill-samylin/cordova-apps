import ClassControl from './ClassControl';
export default class OneSignal extends ClassControl {
    init(key) {
        if (this._isKey(key)) {
            return new Promise((resolve) => {
                this._call(resolve);
                const plugin = window.plugins.OneSignal;
                plugin
                    .startInit(key)
                    .inFocusDisplaying(plugin.OSInFocusDisplayOption.Notification)
                    .endInit();
                plugin.getIds(({ userId })=>{
                    if (userId) {
                        stream.log("Plugins", "onesignal", {
                            "id": userId || ''
                        })
                        resolve({ onesignal_id: userId });
                    }
                });
              
            })
        } else {
            return Promise.resolve({});
        }
    }
    sendTag(pid) {
        window.plugins.OneSignal.sendTag("pid", pid);
    }
}