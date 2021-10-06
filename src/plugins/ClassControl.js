export default class ClassControl {
    _isTrue(value) {
        return (value === true || value==='true');
    }
    _isFalse(value) {
        return (value === false || value==='false');
    }
    _isObj(data) {
        return (typeof data === 'object' && Object.keys(data).length);
    }
    _isKey(str) {
        return (typeof str==='string' && str.length>6);
    }
    _isUrl(link) {
        return (typeof link==='string' && link.match(/^((http|https):\/\/)/gm)) ? true : false;
    }
    _call(fn) {
        setTimeout(() => fn({ time_out: 15000 }), 15000);
    }
} 