import {
	LOCATE_ADDRESS,
	LOADING,
	START_SUGGEST_ADDRESS,
	END_SUGGEST_ADDRESS,
} from './actionTypes'

import { geocode } from '../../containers/Map/Geocode/Geocode'

export const locateAddressAction = (locate, coords) => {
	return {
		type: LOCATE_ADDRESS,
		locate: locate,
		coords: coords,
	}
}

export const locateAddress = () => {
	return dispatch => {
		dispatch({ type: LOADING, loading: true })
		const geo_success = position => {
			dispatch(locateAddressAction(true, position.coords))
		}
		const geo_error = () => {
			dispatch(locateAddressAction(false, null))
		}
		const geo_options = {
			enableHighAccuracy: true,
			maxAge: 0,
			timeout: 30000,
		}
		navigator.geolocation.getCurrentPosition(
			geo_success,
			geo_error,
			geo_options
		)
	}
}

export const suggestAddressAction = suggested => {
	return {
		type: END_SUGGEST_ADDRESS,
		suggested: suggested,
	}
}

export const suggestAddress = eventTarget => {
	return dispatch => {
		dispatch({ type: START_SUGGEST_ADDRESS, address: eventTarget })
		geocode(eventTarget, cb => {
			dispatch(suggestAddressAction(cb.items))
		})
	}
}
