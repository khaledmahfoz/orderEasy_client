import * as actionTypes from '../actions/actionTypes'

let intialState = {
	cart: [],
	loading: false
}

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CART:
			return {
				...state,
				cart: [...action.cart]
			}
		case actionTypes.TOGGLE_ITEM:
			const itemState = state.cart.find(elem => elem._id === action.item._id)
			if (itemState) {
				const updatedCart = state.cart.filter(elem => elem._id !== action.item._id)
				localStorage.setItem("cart", JSON.stringify(updatedCart))
				return {
					...state,
					cart: [...updatedCart]
				}
			} else {
				localStorage.setItem("cart", JSON.stringify([
					...state.cart,
					{...action.item, quantity: 1}
				]))
				return {
					...state,
					cart: [
						...state.cart,
						{...action.item, quantity: 1}
					],
				}
			}
		case actionTypes.INC_ITEM:
			let targetIndex
			let target = state.cart.find((elem, index) => {
				targetIndex = index
				return elem._id === action._id
			})
			if (target) {
				let updatedCart = [...state.cart]
				updatedCart[targetIndex].quantity += 1
				localStorage.setItem("cart", JSON.stringify(updatedCart))
				return {
					...state,
					cart: [...updatedCart]
				}
			}
		case actionTypes.DEC_ITEM:
			let targetDelIndex
			let targetDel = state.cart.find((elem, index) => {
				targetDelIndex = index
				return elem._id === action._id
			})
			if (targetDel) {
				let updatedCart = [...state.cart]
				if (updatedCart[targetDelIndex].quantity > 1) {
					updatedCart[targetDelIndex].quantity -= 1
					localStorage.setItem("cart", JSON.stringify(updatedCart))
					return {
						...state,
						cart: [...updatedCart]
					}
				}
			}
		case actionTypes.EMPTY_CART:
			localStorage.setItem("cart", JSON.stringify([]))
			return {
				...state,
				cart: []
			}
		case actionTypes.CART_LOADING:
			return {
				...state,
				loading: !state.loading
			}
		default:
			return {
				...state
			}
	}
}

export default reducer
