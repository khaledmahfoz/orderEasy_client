import * as actionTypes from '../actions/actionTypes'

const intialState = {
   formElem: {
      content: {
         elemType: 'textarea',
         value: '',
         label: 'Enter your review',
         config: {
            type: 'text',
            placeholder: 'Enter a review',
         },
         valid: false,
         message: null,
         validationConfig: {
            required: {
               value: true,
               message: 'Enter a review'
            }
         }
      },
   },
   formValidity: false
}

const reducer = (state = intialState, action) => {
   switch (action.type) {
      case actionTypes.GET_MENU_REVIEW_FORM:
         return {
            ...state,
         }
      default:
         return {
            ...state,
         }
   }
}
export default reducer
