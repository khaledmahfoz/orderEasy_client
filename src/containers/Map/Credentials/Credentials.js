import {baseUrl} from '../../../util/baseUrl'

let H, platform, defaultLayers

if (window.H) {
   console.log('sd')
   fetch(baseUrl + 'credentials')
      .then(res => {
         if (res.status !== 200) {
            throw new Error('something went wrong')
         }
         return res.json()
      })
      .then(keys => {
         console.log(keys)
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
