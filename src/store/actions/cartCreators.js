import * as actionTypes from './actionTypes'
import {baseUrl} from '../../util/baseUrl'

export const setCart = (cart) => {
   console.log('ssssds')
   console.log(cart)
   return {
      type: actionTypes.SET_CART,
      cart
   }
}

export const setCartAsync = (cart, Authenticated, token) => {
   console.log('your here')
   return dispatch => {
      dispatch(setCart(cart))
   }
   // if (false) {
   //    console.log(2)
   //    return dispatch => {
   //       fetch(baseUrl + 'set-cart', {
   //          method: 'POST',
   //          headers: {
   //             'Content-Type': 'application/json',
   //             'Authorization': 'Bearer ' + token
   //          },
   //          body: JSON.stringify({cart})
   //       })
   //          .then(res => {
   //             if (res.status !== 200) {
   //                throw new Error('oops')
   //             }
   //             return res.json()
   //          })
   //          .then(cartArr => {
   //             console.log(cartArr)
   //             dispatch(setCart(cartArr))
   //          })
   //          .catch(err => console.log(err))
   //    }
   // } 
}


const toggleItem = (item) => {
   console.log(item)
   return {
      type: actionTypes.TOGGLE_ITEM,
      item
   }
}

export const toggleItemAsync = (item, Authenticated, token, startLoading, stopLoading) => {
   if (Authenticated) {
      return dispatch => {
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
                  throw new Error('oops')
               }
               return res.json()
            })
            .then(() => {
               console.log('done')
               dispatch(toggleItem(item))
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
            })
            .catch(err => console.log(err))
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
   console.log(startLoading)
   if (Authenticated) {
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
                  throw new Error('oops')
               }
               return res.json()
            })
            .then(() => {
               console.log('done')
               dispatch(incItem(itemId))
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
            })
            .catch(err => console.log(err))
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
                  throw new Error('oops')
               }
               return res.json()
            })
            .then(() => {
               console.log('done')
               dispatch(decItem(itemId))
               dispatch({type: actionTypes.CART_LOADING})
               stopLoading()
            })
            .catch(err => console.log(err))
      }
   } else {
      return dispatch => dispatch(decItem(itemId))
   }
}

