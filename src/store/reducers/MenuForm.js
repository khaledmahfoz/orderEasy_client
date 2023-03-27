import * as actionTypes from '../actions/actionTypes'

const intialState = {
   formElem: {
      category: {
         elemType: 'input',
         value: '',
         label: 'Enter category name',
         config: {
            type: 'text',
            placeholder: 'Enter category name',
         },
         valid: false,
         message: null,
         validationConfig: {
            required: {
               value: true,
               message: 'Enter category name'
            },
            minLength: {
               value: 5,
               message: 'Category name should be atleast 5 characters'
            },
            maxLength: {
               value: 15,
               message: 'Category name shouldn\'t exceed 15 characters'
            }
         }
      },
      meal: {
         elemType: 'input',
         value: '',
         label: 'Enter meal title',
         config: {
            type: 'text',
            placeholder: 'Enter meal title',
         },
         valid: false,
         message: null,
         validationConfig: {
            required: {
               value: true,
               message: 'Enter meal title'
            },
            minLength: {
               value: 5,
               message: 'Meal title should be atleast 5 characters'
            },
            maxLength: {
               value: 15,
               message: 'Meal title shouldn\'t exceed 15 characters'
            }
         }
      },
      price: {
         elemType: 'input',
         value: '',
         label: 'Enter meal price',
         config: {
            type: 'text',
            placeholder: 'Enter a price',
         },
         valid: false,
         message: null,
         validationConfig: {
            required: {
               value: true,
               message: 'Enter a price'
            }
         }
      },
      description: {
         elemType: 'textarea',
         value: '',
         valid: false,
         label: 'Enter meal description',
         message: null,
         config: {
            type: 'textarea',
            placeholder: 'Enter meal description',
         },
         validationConfig: {
            required: {
               value: true,
               message: 'Please provide a brief description'
            },
            minLength: {
               value: 5,
               message: 'Description should be atleast 5 characters'
            },
            maxLength: {
               value: 30,
               message: 'Description shouldn\'t exceed 30 characters'
            }
         }
      },
   },
   formValidity: false,
}

const reducer = (state = intialState, action) => {
   switch (action.type) {
      case actionTypes.GET_MENU_FORM:
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
