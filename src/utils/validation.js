export const isTrue = (bol) => (bol === true || bol==='true');
export const isFalse = (bol) => (bol === false || bol==='false');
export const isObj = (obj) => (typeof obj === 'object' && Object.keys(obj).length);
export const isKey = (str) => (typeof str==='string' && str.length>6);
export const isUrl = (link) => (typeof link==='string' && link.match(/^((http|https):\/\/)/gm)) ? true : false;