import ClassControl from './ClassControl';
export default class Branch extends ClassControl {
    _link(obj) {
        let link = 'app://';
        for (let key in obj) {
            link+= (key.slice(0, 1).match(/[a-zA-z]/g)) ? `${key}=${obj[key]}&` : '';
        }
        return link.slice(0, link.length-1) || '';
    }
    init(active=false, getData=false) {
        if (this._isTrue(active)) {
            return new Promise((resolve) => {
                this._call(resolve); 
                window.Branch.initSession()
                    .then((data) => this._isTrue(data['+clicked_branch_link']) ? data : Promise.reject())
                    .then((res) => {
                        const links = {};
                        if (this._isTrue(getData)) links.branch_data = res;
                        links.deeplink_branch = this._link(res);
                        resolve(links)
                    })
                    .catch(() => resolve({}))
            });
        } else {
            return Promise.resolve({});
        }
    }
}