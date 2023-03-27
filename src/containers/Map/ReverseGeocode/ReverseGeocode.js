import {platform} from '../Credentials/Credentials'

const reverseGeocode = (coords, cb) => {
  let service
  try {
    service = platform.getSearchService();
    service.reverseGeocode({
      at: coords.latitude + ',' + coords.longitude,
    }, result => {
      result.items.length ? cb(result.items[0]) : cb(null)
    }, err => {
      cb(err)
    });
  } catch{
    cb(new Error('something went wrong'))
  }
}

export default reverseGeocode