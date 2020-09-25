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
      // console.log(this.props.Authenticated)
      if (!this.props.Authenticated) {
         this.setState({valid: false})
      } else {
         console.log(this.props.cart)
         fetch(baseUrl + 'post-order', {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({cart: this.props.cart})
         })
            .then(res => {
               return res.json()
            })
            .then(() => {
               this.props.closeModal()
               this.props.onEmptyCart()
               this.props.history.push("/orders")
            })
            .catch(err => console.log(err))
      }
   }

   // shouldComponentUpdate(nextProps, nextState) {
   //    if (nextProps.showModal) {
   //       console.log('will update')
   //       return true;
   //    }
   //    return false;
   // }


   // componentDidMount() {
   //    console.log(this.props.cart)
   // }



   // static getDerivedStateFromProps(nextProps, prevState) {
   //    if (nextProps.showModal) {
   //       return {
   //          cart: nextProps.cart
   //       }
   //    }
   // }

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
                  Authenticated={this.props.Authenticated}
                  cartLoading={this.props.cartLoading} />
            )
         })
         let totalPrice = priceArr.reduce((acc, curr) => acc + curr, 0)
         content = (
            <React.Fragment>
               {contentItems}
               <div className={classes.CartInfo}>
                  <h5>Total Price: {totalPrice}$</h5>
                  <AuthButton
                     isValid={!this.props.cartLoading}
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
                              onClick={() => {
                                 this.props.swipeContent ? this.props.swipeContent(false) : this.props.history.push('/login')
                              }}>
                              Login
                           </button>
                        </div>
                     </div>
                     : null
                  }
               </div>
            </React.Fragment>
         )
      }
      return (
         <div className={`${this.props.cart.length ? classes.Cart : classes.CartEmpty} ${this.props.custom && classes.CartConfig}`}>
            {content}
         </div>
      )
   }
}


const mapStateToProps = state => {
   return {
      cart: state.cartReducer.cart,
      token: state.authReducer.token,
      Authenticated: state.authReducer.token !== null ? true : false,
      cartLoading: state.cartReducer.loading
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onToggleItem: (item, Authenticated, token, startLoading, stopLoading) => dispatch(toggleItemAsync(item, Authenticated, token, startLoading, stopLoading)),
      onIncItem: (_id, Authenticated, token, startLoading, stopLoading) => dispatch(incItemAsync(_id, Authenticated, token, startLoading, stopLoading)),
      onDecItem: (_id, Authenticated, token, startLoading, stopLoading) => dispatch(decItemAsync(_id, Authenticated, token, startLoading, stopLoading)),
      onEmptyCart: () => dispatch({type: actionTypes.EMPTY_CART})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))