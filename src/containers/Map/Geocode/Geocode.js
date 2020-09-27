import {platform} from '../Credentials/Credentials'

export const geocode = (address, cb) => {
   let service
   try {
      service = platform.getSearchService();
      if (address !== '') {
         service.autosuggest({
            q: address,
            langs: 'ar-eg',
            at: '26.8205528,30.8024979',
            limit: 5
         }, (result) => {
            cb(result)
         }, err => {
            cb(err)
         });
      } else {
         cb([])
      }
   } catch{
      cb(new Error('something went wrong'))
   }
}