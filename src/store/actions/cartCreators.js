import * as actionTypes from './actionTypes'
import {baseUrl} from '../../util/baseUrl'

const setCart = (cart) => {
   return {
      type: actionTypes.SET_CART,
      cart
   }
}

export const setCartAsync = (cart, Authenticated, token) => {
   console.log(1)
   console.log(Authenticated)
   if (false) {
      console.log(2)
      return dispatch => {
         fetch(baseUrl + 'set-cart', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({cart})
         })
            .then(res => {
               if (res.status !== 200) {
                  throw new Error('oops')
               }
               return res.json()
            })
            .then(() => {
               console.log('done')
               dispatch(setCart(cart))
            })
            .catch(err => console.log(err))
      }
   } else {
      return dispatch => dispatch(setCart(cart))
   }
}




const toggleItem = (item) => {
   return {
      type: actionTypes.TOGGLE_ITEM,
      item
   }
}

export const toggleItemAsync = (item, Authenticated, token) => {
   if (Authenticated) {
      return dispatch => {
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

export const incItemAsync = (itemId, Authenticated, token) => {
   if (Authenticated) {
      return dispatch => {
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

export const decItemAsync = (itemId, Authenticated, token) => {
   if (Authenticated) {
      return dispatch => {
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
            })
            .catch(err => console.log(err))
      }
   } else {
      return dispatch => dispatch(decItem(itemId))
   }
}

