export default function crypt(data) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))))
}