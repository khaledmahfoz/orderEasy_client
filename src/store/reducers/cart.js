import * as actionTypes from '../actions/actionTypes'

let intialState = {
	cart: [],
	loading: false
}

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.SET_CART:
			console.log(action.cart)
			// localStorage.setItem("cart", JSON.stringify(action.cart))
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
				console.log(updatedCart[targetDelIndex].quantity)
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



// const reducer = (state = intialState, action) => {
// 	switch (action.type) {
// 		case actionTypes.SET_MENU:
// 			return {
// 				...state,
// 			}
// 		case actionTypes.ADD:
// 			// let menuItems = []
// 			// if (Object.keys(state.menu).length) {
// 			// 	Object.keys(state.menu).map(elem => {
// 			// 		menuItems.push(...state.menu[elem])
// 			// 	})
// 			// }
// 			// let target = state.menu.filter(elem => elem.id === action.id)
// 			return {
// 				...state,
// 				cart: [...state.cart, { ...action.target }],
// 			}
// 		case actionTypes.REMOVE:
// 			let updatedCart = state.cart.filter(elem => elem.id !== action.target.id)
// 			return {
// 				...state,
// 				cart: [...updatedCart],
// 			}
// 		case actionTypes.ADD_ITEM:
// 			let target = state.cart.filter(elem => elem.id !== action.target.id)
// 			let updated = target.length
// 				? { ...target, quantity: target.quantity + 1 }
// 				: action.target
// 			return {
// 				...state,
// 				cart: [...state.cart, updated],
// 			}
// 		default:
// 			return state
// 	}
// }

export default reducer
