import ClassControl from './ClassControl';
export default class AppsFlyer extends ClassControl {
    init(key='', getData=false) {
        if (this._isKey(key)) {
            const options = { devKey: key, isDebug: false, onInstallConversionDataListener: true };
            return new Promise((resovle) => {
                window.plugins.appsFlyer.initSdk(options, 
                    (result) => {
                        try {
                            const conversion = JSON.parse(result);
                            resovle({
                                campaign_af: (conversion.data && conversion.data.campaign) ? conversion.data.campaign : '',
                                af_status: (conversion.data && conversion.data.af_status) ? conversion.data.af_status : '',
                                conversion_data: (this._isTrue(getData)) ? JSON.stringify(conversion) : '',
                            });
                        } catch (err) {
                            resovle({});
                        }     
                    },
                    () => resovle({})
                )
            })
            .catch(() => resovle({}));
        } else {
            return Promise.resolve({});
        }
    }
}