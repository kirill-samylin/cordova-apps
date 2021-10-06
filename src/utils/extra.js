import { isObj } from './validation.js';
export function getExtra() {
    const extra = localStorage.getItem('extra');
    return (extra) ? JSON.parse(extra) : {}; 
}
export function setExtra(obj) {
    if (isObj(obj)) {
        const extra = Object.assign({}, obj);
        delete extra.onesignal_get_id;
        localStorage.setItem('extra', JSON.stringify(extra));
    }
}