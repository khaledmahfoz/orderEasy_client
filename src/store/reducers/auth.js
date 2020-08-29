import * as actionTypes from '../actions/actionTypes'

const intialState = {
   token: null,
   id: null,
   isResturant: false,
   title: '',
   loading: false,
   error: null
}

const reducer = (state = intialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_CLEAR:
         return {
            ...state,
            error: null
         }
      case actionTypes.START_AUTH:
         return {
            ...state,
            loading: true
         }
      case actionTypes.AUTH_SUCCESS:
         return {
            ...state,
            loading: false,
            error: null,
            token: action.token,
            id: action.id,
            isResturant: action.isResturant,
            title: action.title
         }
      case actionTypes.AUTH_FAILED:
         return {
            ...state,
            loading: false,
            error: action.error
         }
      case actionTypes.LOG_OUT:
         localStorage.removeItem('token')
         localStorage.removeItem('id')
         localStorage.removeItem('isResturant')
         localStorage.removeItem('title')
         return {
            ...state,
            loading: false,
            error: null,
            token: null,
            id: null,
            isResturant: false,
            title: ''
         }
      default:
         return {
            ...state,
         }
   }
}
export default reducer
