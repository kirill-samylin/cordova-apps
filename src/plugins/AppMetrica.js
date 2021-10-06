import { stream } from '../utils/constants';
export default function AppMetrica() {
    this.key = null;
    this.history = [];
    this._readHistory = function() {
        for (let [event, name, obj] of this.history) {
            this.analytics(event, name, obj);
        }
    }
    this.activate = function(apiKey, status=true) {
        if (apiKey && !this.key) {
            const options = { apiKey, locationTracking: true, handleFirstActivationAsUpdate: status, sessionTimeout: 15 };
            window.appMetrica.activate(options);
            this.key = apiKey;
            if (this.history.length) {
                this._readHistory();
            }
        }
    }
    this.analytics = function(event='Events', name='', data={}) {
        if (this.key) {
            stream.log(event, { [name]: data });
            window.appMetrica.reportEvent(event, { [name]: data });
        } else {
            this.history.push([...arguments]);
        }
    }
}