import * as actionTypes from '../actions/actionTypes'

const intialState = {
	homeCoords: null,
	signupCoords: null,
	resturantCoords: null,
	homeAddress: '',
	resturantAddress: '',
	signupAddress: ''
}

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.SET_HOME_COORDS:
			if (!action.coords || !action.address) {
				localStorage.removeItem("coords")
				localStorage.removeItem("address")
			}
			localStorage.setItem("coords", JSON.stringify(action.coords))
			localStorage.setItem("address", action.address)
			return {
				...state,
				homeCoords: action.coords,
				homeAddress: action.address
			}
		case actionTypes.SET_RESTURANT_COORDS:
			return {
				...state,
				resturantCoords: action.coords,
				resturantAddress: action.address
			}
		case actionTypes.SET_SIGNUP_COORDS:
			return {
				...state,
				signupCoords: action.coords,
				signupAddress: action.address
			}
		default:
			return {
				...state,
			}
	}
}
export default reducer
