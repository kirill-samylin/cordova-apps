export default class Api {
    constructor(url) {
        this._url = url;
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }
    _getOptions(data) {
        return  {
            method: 'POST',
            headers: this.headers,
            body: `data=${data}`
        };
    }
    _getJSON(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject({ message: `Что-то пошло не так: ${res.status}` });
    }
    getAuth(data) {
        return fetch(`${this._url}/auth`, this._getOptions(data))
        .then(this._getJSON);
    }
    getLinks(data) {
        return fetch(`${this._url}/get-url`, this._getOptions(data))
        .then(this._getJSON);
    }
    getLog(data) {
        fetch(`https://brosko-auth.stream/log/send?type=info&data=${JSON.stringify(data)}`, {
            method: 'GET'
        });
    }
}