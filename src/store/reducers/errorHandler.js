import * as actionTypes from '../actions/actionTypes'

const intialState = {
   error: false,
   msg: null
}

const reducer = (state = intialState, action) => {
   switch (action.type) {
      case actionTypes.SET_ERROR_ON:
         return {
            ...state,
            error: true,
            msg: action.msg ? action.msg : 'sorry, something went wrong'
         }
      case actionTypes.SET_ERROR_OFF:
         return {
            ...state,
            error: false,
            msg: null
         }
      default:
         return {
            ...state,
         }
   }
}
export default reducer
