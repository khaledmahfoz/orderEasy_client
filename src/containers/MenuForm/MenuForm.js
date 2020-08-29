import React, {Component} from 'react'
import {connect} from 'react-redux'
import StarRatings from 'react-star-ratings'

import classes from './MenuForm.module.css'

import {baseUrl} from '../../util/baseUrl'
import {validateForm} from '../../util/validationSchema'
import FormInput from '../../components/UI/FormInput/FormInput'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'
import {SmallLoading} from '../../components/UI/SmallLoading/SmallLoading'

class MenuForm extends Component {
   state = {
      // formElem: this.props.single ? this.props.formItemElem : this.props.formElem,
      // formValidity: this.props.single ? this.props.formItemValidity : this.props.formValidity
      formElem: this.props.formElem,
      formValidity: this.props.formValidity,
      ratingValidity: false,
      rating: 0
   }

   changeRating(newRating, name) {
      this.setState({
         rating: newRating,
         ratingValidity: newRating > 0 ? true : false
      })
   }

   changeHandler = (value, identifier) => {
      let updatedFormElem = {
         ...this.state.formElem,
      }

      let updatedElem = {
         ...updatedFormElem[identifier],
      }
      updatedElem.value = value

      let validation = validateForm(value, updatedElem.validationConfig)
      updatedElem.valid = validation.isValid
      updatedElem.message = validation.message
      updatedFormElem[identifier] = updatedElem

      let formValidity = true
      for (let identifier in updatedFormElem) {
         formValidity = updatedFormElem[identifier].valid && formValidity
      }

      this.setState({formElem: updatedFormElem, formValidity: formValidity})
   }

   clearFields = () => {
      let updatedFormElem = {
         ...this.state.formElem,
      }
      for (let identifier in updatedFormElem) {
         let updatedElem = {
            ...updatedFormElem[identifier],
         }
         updatedElem.value = ''
         updatedElem.message = null
         updatedElem.valid = false
         updatedFormElem[identifier] = updatedElem
      }
      this.setState({formElem: updatedFormElem, formValidity: false})
   }

   addMenuItem = (e) => {
      console.log(this.props.review)
      e.preventDefault()
      this.props.menuLoadingHandler()
      if (this.props.single) {
         if (this.state.formValidity) {
            let meal = this.state.formElem.meal.value
            let price = this.state.formElem.price.value
            let description = this.state.formElem.description.value
            let menu = {
               menuId: this.props.menuId,
               meal,
               price,
               description
            }
            fetch(baseUrl + 'admin/add-menuItem', {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.token
               },
               method: 'POST',
               body: JSON.stringify(menu)
            })
               .then(res => res.json())
               .then(res => {
                  this.props.menuLoadingHandler()
                  this.props.updatedFinishedHandler(res)
                  this.clearFields()
               })
               .catch(err => console.log(err))
         }
      } else if (this.props.review) {
         if (this.state.formValidity && (this.state.rating > 0)) {
            // let rate = this.state.formElem.rate.value
            let rate = this.state.rating
            console.log(rate)
            let content = this.state.formElem.content.value
            let resturantId = this.props.resturantId
            // let itemId = this.props.itemId
            let itemId = this.props.orderItemId
            let review = {
               rate,
               content,
               resturantId,
               itemId
            }
            fetch(baseUrl + 'post-review', {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.token
               },
               method: 'POST',
               body: JSON.stringify(review)
            })
               .then(res => {
                  if (res.status !== 200) {
                     throw new Error('something went wrong')
                  }
                  return res.json()
               })
               .then(res => {
                  console.log(res)
                  this.props.menuLoadingHandler()
                  this.props.closeEditHandler() //added
                  // this.props.updatedFinishedHandler(res)
                  this.clearFields()
               })
               .catch(err => console.log(err))
         }
      } else {
         if (this.state.formValidity) {
            let catageory = this.state.formElem.category.value
            let meal = this.state.formElem.meal.value
            let price = this.state.formElem.price.value
            let description = this.state.formElem.description.value
            let menu = {
               catageory,
               meal,
               price,
               description
            }
            console.log(this.props.token)
            fetch(baseUrl + 'admin/add-menu', {
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.props.token
               },
               method: 'POST',
               body: JSON.stringify(menu)
            })
               .then(res => res.json())
               .then(res => {
                  console.log(res)
                  this.props.menuLoadingHandler() //added
                  this.props.updatedFinishedHandler(res)
                  this.clearFields()
               })
               .catch(err => console.log(err))
         }
      }
   }

   render = () => {
      let addItemForm = null
      addItemForm = (
         <form onSubmit={this.addMenuItem}>
            {
               this.props.review
               && (
                  <div className={classes.ReviewBlock}>
                     <label>Rate this order</label>
                     <StarRatings
                        rating={this.state.rating}
                        changeRating={(rating) => this.changeRating(rating)}
                        starRatedColor="var(--primeColor)"
                        starDimension="1.4rem"
                        starSpacing="1px"
                        numberOfStars={5}
                        name='makeRatings'
                     />
                  </div>
               )
            }
            {Object.keys(this.state.formElem).map(elem => {
               return (
                  <div style={{marginBottom: '1rem'}} key={this.state.formElem[elem].label}>
                     <label>{this.state.formElem[elem].label}</label>
                     <FormInput
                        identifier={elem}
                        elemType={this.state.formElem[elem].elemType}
                        config={this.state.formElem[elem].config}
                        value={this.state.formElem[elem].value}
                        changeHandler={this.changeHandler}
                     />
                     <ErrorMessage>{this.state.formElem[elem].message}</ErrorMessage>
                  </div>
               )
            })}
            <div className="d-flex align-items-center">
               {/* <button disabled={!this.state.formValidity}>
                  {
                     !this.props.review
                        ? 'Add item'
                        : !this.props.addReviewLoading
                           ? 'Add review'
                           : <span className={classes.controllBtn}><SmallLoading color="var(--whiteColor)" /></span>
                  }
               </button> */}
               {
                  this.props.review ?
                     <button disabled={!this.state.formValidity || !this.state.ratingValidity}>
                        {
                           !this.props.addReviewLoading
                              ? 'Add review'
                              : <span className={classes.controllBtn}><SmallLoading color="var(--whiteColor)" />
                              </span>
                        }
                     </button>
                     : <button disabled={!this.state.formValidity}>
                        Add item
                  </button>
               }
               <button disabled={this.props.loadingInd} onClick={this.props.closeEditHandler}>
                  cancel
               </button>
            </div>
         </form>
      )

      return (
         <div className={classes.MenuForm}>
            {addItemForm}
         </div>
      )
   }
}

// const mapStateToProps = state => {
//    return {
//       formElem: state.menuFormReducer.formElem,
//       formValidity: state.menuFormReducer.formValidity,
//       formItemElem: state.menuFormItemReducer.formElem,
//       formItemValidity: state.menuFormItemReducer.formValidity,
//    }
// }

// export default connect(mapStateToProps)(MenuForm)
export default MenuForm

