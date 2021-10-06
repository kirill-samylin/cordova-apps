export default class UrlManagement {
    constructor(onSaveLink) {
        this._count = 0;
        this._countAttempts = 2;
        this._domen = '';
        this._status = true;
        this._time;
        this._onSaveLink = onSaveLink;
        this._off = false;
        this._home = null;
        this._block = localStorage.getItem('UrlManagement') || false;
    }
    _timeAndSave(link) {
        const domen = this._isDomen(link);
        clearInterval(this._time);
        this._time = setTimeout(() => {
            if (domen===this._domen) {
                this._onSaveLink(link); 
            }
        }, 1000);
    }
    _isDomen(url) {
        let domen = url.match(/^((http|https):\/\/)(www\.)?([A-Za-z0-9.-]{1,256})\.[A-Za-z0-9]{1,20}/gm);
        if (!domen) return false;
        domen = domen[0];
        domen = domen.replace('http://', '');
        domen = domen.replace('https://', '');
        domen = domen.replace('www.', '');
        domen = domen.split('.');
        if (!domen.length || domen.length<2) return false;
        return `${domen[domen.length-2]}.${domen[domen.length-1]}`;
    }
    attempts(count) {
        if (+count && !Number.isNaN(+count)) {
            this._countAttempts = +count;
        }
    }
    saving(link) {
        this._domen = this._isDomen(link);
        this._status = false;
    }
    homePage(link) {
        if (!this._home && link && !this._block) {
            this._home = link;
        }
    }
    off(status) {
        if (status === true || status === 'true') {
            this._off = true;
        }
    }
    offAll() {
        this._block = true;
        localStorage.setItem('UrlManagement', 'true');
    }
    loading(link) {
        if (!localStorage.getItem("site")) this._onSaveLink(link);
        if (this._block) return;
        if (this._off) {
            this._onSaveLink(link);
            return;
        }
        const domen = this._isDomen(link);
        if (!domen) return;
        if (this._home) {
            if (domen===this._isDomen(this._home)) {
                this._onSaveLink(this._home);
                localStorage.setItem('UrlManagement', 'true');
                this._block = true;
            }
        }
        if (this._status) {
            if (domen===this._domen) {
                this._count++;
            } else {
                this._count = 1;
                this._domen = domen;
            }
        } else {
            this._timeAndSave(link);
        }
        if (this._count>=this._countAttempts && this._status) {
            this._status = false;
            this._onSaveLink(link);
        }
    }
}