import * as actionTypes from '../actions/actionTypes'

let intialState = {
	cart: [],
}

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.SET_MENU:
			return {
				...state,
			}
		case actionTypes.ADD:
			// let menuItems = []
			// if (Object.keys(state.menu).length) {
			// 	Object.keys(state.menu).map(elem => {
			// 		menuItems.push(...state.menu[elem])
			// 	})
			// }
			// let target = state.menu.filter(elem => elem.id === action.id)
			return {
				...state,
				cart: [...state.cart, { ...action.target }],
			}
		case actionTypes.REMOVE:
			let updatedCart = state.cart.filter(elem => elem.id !== action.target.id)
			return {
				...state,
				cart: [...updatedCart],
			}
		case actionTypes.ADD_ITEM:
			let target = state.cart.filter(elem => elem.id !== action.target.id)
			let updated = target.length
				? { ...target, quantity: target.quantity + 1 }
				: action.target
			return {
				...state,
				cart: [...state.cart, updated],
			}
		default:
			return state
	}
}

export default reducer
