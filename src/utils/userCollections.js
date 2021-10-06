export default async function userCollections() {
    const [name, id, appsflyer_device_id, idfa] = await Promise.all([
        cordova.getAppVersion.getPackageName(),
        +localStorage.getItem('id') || -1,
        new Promise(resolve => window.plugins.appsFlyer.getAppsFlyerUID(resolve)),
        cordova.plugins.idfa.getInfo().then((i) => (!i.limitAdTracking) ? i.idfa || i.aaid : '')
    ]);
    return { package: name, id, appsflyer_device_id, idfa };
}