import {platform} from '../Credentials/Credentials'

const reverseGeocode = (coords, cb) => {
  const service = platform.getSearchService();
  service.reverseGeocode({
    at: coords.latitude + ',' + coords.longitude,
  }, result => {
    result.items.length ? cb(result.items[0]) : cb(null)
  }, alert);
}

export default reverseGeocode