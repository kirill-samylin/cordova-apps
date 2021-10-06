import { branch, signal, flyer } from './constants.js';

export async function getDeeplinks(extra={}, id) {
    const { 
        branch_active=false, 
        activate_send_branch_data=false,
        one_signal_key='',
        apps_flyer_key='',
        activate_send_conversion_data=false,
        fb_app_id='',
    } = extra;
    const links = await Promise.all([
        branch.init(branch_active, activate_send_branch_data),
        new Promise((resolve) => {
            if (fb_app_id) {
                facebookConnectPlugin.initialize(fb_app_id, function () {
                    facebookConnectPlugin.getDeferredApplink(
                        function(link) {
                            resolve({ deeplink_fb: link });
                        },
                        function (error) {
                            resolve({ deeplink_fb: error });
                        }
                    );
                })
            } else {
                resolve({ deeplink_fb: '' });
            }
        }),
        signal.init(one_signal_key),
        flyer.init(apps_flyer_key, activate_send_conversion_data),
        { access_token: id },
    ]);
    const deeplinks = Object.assign(...links);
    deeplinks.deeplink = deeplinks.deeplink_branch || deeplinks.deeplink_fb || '';
    return deeplinks;
}

export function onPlugins({ app_metrica_key, one_signal_key, apps_flyer_key }) {
    window.metrica.activate(app_metrica_key, true);
    signal.init(one_signal_key);
    flyer.init(apps_flyer_key);
}