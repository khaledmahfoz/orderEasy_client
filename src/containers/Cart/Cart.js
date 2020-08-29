import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import classes from './Cart.module.css'
import classes2 from '../../components/AuthLogin/AuthLogin.module.css'

import Bag from '../../components/UI/Bag/Bag'
import CartItem from './CartItem/CartItem'
import * as actionTypes from '../../store/actions/actionTypes'
import AuthButton from '../../components/UI/AuthButton/AuthButton'
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage'
import {baseUrl} from '../../util/baseUrl'
import {toggleItemAsync, incItemAsync, decItemAsync} from '../../store/actions/cartCreators'
// import errorMessage from '../../components/UI/ErrorMessage/ErrorMessage'

class Cart extends Component {

   state = {
      valid: true
   }

   clickHandler = () => {
      console.log(this.props.cart)
      if (!this.props.Authenticated) {
         this.setState({valid: false})
      } else {
         fetch(baseUrl + 'post-order', {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({cart: this.props.cart})
         })
            .then(res => {
               // if (res.status === 401) {
               //    throw new Error("You need to login first")
               // }
               return res.json()
            })
            .then(res => {
               console.log(res)
               this.props.closeModal()
               this.props.onEmptyCart()
               this.props.history.push("/orders")
            })
            .catch(err => console.log(err))
      }
   }

   render() {
      let content = (
         <div className="d-flex flex-column justify-content-center align-items-center">
            <Bag />
            <h4>Your cart is empty</h4>
         </div>
      )
      if (this.props.cart.length) {
         const priceArr = []
         let contentItems
         contentItems = this.props.cart.map(item => {
            priceArr.push(item.price * item.quantity)
            return (
               <CartItem
                  key={item._id}
                  data={item}
                  onIncItem={this.props.onIncItem}
                  onDecItem={this.props.onDecItem}
                  onToggleItem={this.props.onToggleItem}
                  token={this.props.token}
                  Authenticated={this.props.Authenticated} />
            )
         })
         let totalPrice = priceArr.reduce((acc, curr) => acc + curr, 0)
         content = (
            <React.Fragment>
               {contentItems}
               <div className={classes.CartInfo}>
                  <h5>Total Price: {totalPrice}$</h5>
                  <AuthButton
                     isValid={true}
                     clickHandler={this.clickHandler}
                     color="var(--greenColor)"
                  >
                     Order Now
                  </AuthButton>

                  {!this.state.valid ?
                     <div>
                        <div className={classes2.SignupInfo}>
                           <p>Please login to continue</p>
                           <button
                              className={classes2.Signup}
                              onClick={() => this.props.swipeContent(false)}>
                              Login
                           </button>
                        </div>
                        {/* <ErrorMessage>
                           Please login to continue
                        </ErrorMessage>
                        <button
                           onClick={() => this.props.swipeContent(false)}
                        >
                           Login
                        </button> */}
                     </div>
                     : null
                  }
               </div>
            </React.Fragment >
         )
      }
      return (
         <div className={this.props.cart.length ? classes.Cart : classes.CartEmpty}>
            {content}
         </div>
      )
   }
}


const mapStateToProps = state => {
   return {
      cart: state.cartReducer.cart,
      token: state.authReducer.token,
      Authenticated: state.authReducer.token !== null ? true : false
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onToggleItem: (item, Authenticated, token) => dispatch(toggleItemAsync(item, Authenticated, token)),
      onIncItem: (_id, Authenticated, token) => dispatch(incItemAsync(_id, Authenticated, token)),
      onDecItem: (_id, Authenticated, token) => dispatch(decItemAsync(_id, Authenticated, token)),
      onEmptyCart: () => dispatch({type: actionTypes.EMPTY_CART})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))