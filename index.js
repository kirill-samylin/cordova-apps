import { stream } from '../utils/constants';
export default function AppMetrica() {
    this.key = null;
    this.history = [];

    this._timeLogs = function() {
        const data = new Date();
        const milliseconds = data.getUTCMilliseconds();
        const mil = (milliseconds<10) ? ('00' + milliseconds) : (milliseconds<100) ? ('0' + milliseconds) : milliseconds;
        return `${data.toLocaleString("ru", { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})}:${mil}`;
    }

    this._readHistory = function() {
        for (let [event, name, obj, clock] of this.history) {
            this.analytics(event, name, obj, clock);
        }
        this.analytics = [];
    }
    this.activate = function(apiKey, status=true) {
        if (apiKey) {
            const options = { apiKey, locationTracking: true, handleFirstActivationAsUpdate: status, sessionTimeout: 15 };
            window.appMetrica.activate(options);
            this.key = apiKey;
            if (this.history.length) {
                this._readHistory();
            }
        }
    }
    this.analytics = function(event='Events', name='', data={}, clock) {
        if (this.key) {
            window.appMetrica.reportEvent(event, { 
                [name]: data,
                //'time': (clock) ? clock : this._timeLogs(), 
            });
        } else {
            this.history.push([event, name, data, this._timeLogs()]);
        }
        stream.log(event, { [name]: data });
    }
}