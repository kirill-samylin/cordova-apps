const jslogger = require('stream-console');
import OneSignal from '../plugins/OneSignal.js';
import InAppBrowser from '../plugins/InAppBrowser.js';
import Api from '../components/Api.js';
import UrlManagement from '../components/UrlManagement.js';
import Branch from '../plugins/Branch.js';
import AppsFlyer from '../plugins/AppsFlyer';
import AppMetrica from '../plugins/AppMetrica';
import { isUrl } from './validation.js';
export const url = 'https://latechang.work/api/v6';
export const flyer = new AppsFlyer();
export const signal = new OneSignal();
export const branch = new Branch();
window.metrica = new AppMetrica();
export const api = new Api(url);
export const stream = jslogger({console: true});
export const keyMetrica = "a91d06d1-0a09-4e75-b96b-a55acd30443a";
stream.on('logs', (data) => {
    Tester.Checker.check_post_logs(data);
    api.getLog(data);
});

export const saved = new UrlManagement((save) => {
    stream.log("ViewListener", "savedLinks", { 
        'link': save
    });
    localStorage.setItem('site', save);
});

export const browser = new InAppBrowser((url) => {
    if (isUrl(url)) {
        stream.log('loading:', encodeURIComponent(url));
        saved.loading(url);
    }
});
