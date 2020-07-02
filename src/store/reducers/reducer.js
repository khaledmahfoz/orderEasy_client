import * as actionTypes from '../actions/actionTypes'

const intialState = {
	address: '',
	secInput: '',
	coords: null,
	suggested: [],
	//ui
	modal: false,
	locate: false,
	loading: false,
	smallLoading: false,
}

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.OPEN_MODAL:
			return {
				...state,
				modal: true,
			}
		case actionTypes.CLOSE_MODAL:
			return {
				...state,
				modal: false,
			}
		case actionTypes.LOADING:
			return {
				...state,
				loading: action.loading,
			}
		case actionTypes.LOCATE_ADDRESS:
			return {
				...state,
				locate: action.locate,
				coords: action.coords,
				suggested: null,
				address: '',
				loading: false,
				modal: true,
			}
		case actionTypes.START_SUGGEST_ADDRESS:
			return {
				...state,
				address: action.address,
				smallLoading: true,
			}
		case actionTypes.END_SUGGEST_ADDRESS:
			return {
				...state,
				suggested: action.suggested,
				smallLoading: false,
			}
		default:
			return {
				...state,
			}
	}
}
export default reducer
