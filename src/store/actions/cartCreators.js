import * as actionTypes from './actionTypes'
import {baseUrl} from '../../util/baseUrl'

export const setCart = (cart) => {
   return {
      type: actionTypes.SET_CART,
      cart
   }
}

export const setCartAsync = (cart, Authenticated, token) => {
   return dispatch => {
      dispatch(setCart(cart))
   }
}

const toggleItem = (item) => {
   return {
      type: actionTypes.TOGGLE_ITEM,
      item
   }
}

const setErrorOn = (msg) => {
   return {
      type: actionTypes.SET_ERROR_ON,
      msg: msg
   }
}

const setErrorOff = () => {
   return {
      type: actionTypes.SET_ERROR_OFF
   }
}

export const toggleItemAsync = (item, Authenticated, token, startLoading, stopLoading) => {
   if (Authenticated) {
      return dispatch => {
         setErrorOff()
         dispatch({type: actionTypes.CART_LOADING})
         startLoading()
         fetch(baseUrl + 'toggle-cart', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({item})
         })
            .then(res => {
               if (res.status !== 200) {
                  throw new Error('something went wrong')
               }
               return res.json()
            })
            .then(() => {
               dispatch(toggleItem(item))
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
            })
            .catch(err => {
               stopLoading()
               dispatch({type: actionTypes.CART_LOADING})
               setErrorOn(err.message)
            })
      }
   } else {
      return dispatch => dispatch(toggleItem(item))
   }
}

const incItem = (itemId) => {
   return {
      type: actionTypes.INC_ITEM,
      _id: itemId
   }
}

export const incItemAsync = (itemId, Authenticated, token, startLoading, stopLoading) => {
   if (Authenticated) {
      setErrorOff()
      return dispatch => {
         dispatch({type: actionTypes.CART_LOADING})
         startLoading()
         fetch(baseUrl + 'inc-cart-item', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({itemId: itemId})
         })
            .then(res => {
               if (res.status !== 200) {
                  throw new Error('something went wrong')
               }
               return res.json()
            })
            .then(() => {
               dispatch(incItem(itemId))
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
            })
            .catch(err => {
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
               setErrorOn(err.message)
            })
      }
   } else {
      return dispatch => dispatch(incItem(itemId))
   }
}


const decItem = (itemId) => {
   return {
      type: actionTypes.DEC_ITEM,
      _id: itemId
   }
}

export const decItemAsync = (itemId, Authenticated, token, startLoading, stopLoading) => {
   if (Authenticated) {
      return dispatch => {
         setErrorOff()
         dispatch({type: actionTypes.CART_LOADING})
         startLoading()
         fetch(baseUrl + 'dec-cart-item', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({itemId: itemId})
         })
            .then(res => {
               if (res.status !== 200) {
                  throw new Error('something went wrong')
               }
               return res.json()
            })
            .then(() => {
               dispatch(decItem(itemId))
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
            })
            .catch(err => {
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
               setErrorOn(err.message)
            })
      }
   } else {
      return dispatch => dispatch(decItem(itemId))
   }
}

