import {platform} from '../Credentials/Credentials'

export const geocode = (address, cb) => {
   const service = platform.getSearchService();
   if(address !== ''){
      service.autosuggest({
         q: address,
         lang: 'ar-eg',
         in: 'countryCode:egy',
         at: '26.8205528,30.8024979',
         limit: 5
         }, (result) => {
            cb(result)
         }, alert);
   }else{
      cb([])
   }
}