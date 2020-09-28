import {baseUrl} from '../../../util/baseUrl'

let H, platform, defaultLayers

if (H) {
   fetch(baseUrl + 'credntials')
      .then(res => {
         if (res.status !== 200) {
            throw new Error('something went wrong')
         }
         return res.json()
      })
      .then(keys => {
         H = window.H
         platform = new H.service.Platform({
            'apikey': keys.apikey,
            'appid': keys.appid
         });
         defaultLayers = platform.createDefaultLayers();
      })
      .catch(err => {
         return {
            H, platform, defaultLayers
         }
      })

}


export {
   H,
   platform,
   defaultLayers
}
