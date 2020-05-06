import {platform} from '../Credentials/Credentials'

const reverseGeocode = (coords, cb) => {
   const service = platform.getSearchService();
   service.reverseGeocode({
      at: coords.latitude + ',' + coords.longitude
    }, result => {
      cb(result.items[0])
    }, alert);
}

export default reverseGeocode