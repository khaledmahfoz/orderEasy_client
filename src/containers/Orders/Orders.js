import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

import MenuForm from '../MenuForm/MenuForm'
import OrderItem from './OrderItem/OrderItem'
import {baseUrl} from '../../util/baseUrl'

class Order extends Component {
   state = {
      orders: null,
      loading: false,
      // addReviewLoading: false
   }

   // {!this.state.itemEditLoading
   //    ? 'submit'
   //    : <span className={classes.controllBtn}><SmallLoading color="var(--whiteColor)" /></span>
   // }



   componentDidMount() {
      this.setState({loading: true})
      fetch(baseUrl + 'get-orders', {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
         },
      })
         .then(res => res.json())
         .then(orders => {
            console.log(orders)
            this.setState({loading: false, orders})
         })
         .catch(err => console.log(err))

   }
   render() {
      let content = <div>No order here</div>
      if (this.state.orders && this.state.orders.length) {
         content = (
            <div className="container">
               <ul>
                  {this.state.orders.map(elem => {
                     console.log(elem)
                     return (
                        <OrderItem
                           key={elem._id}
                           data={elem}
                           isResturant={this.props.isResturant}
                           formElem={this.props.formElem}
                           formValidity={this.props.formValidity}
                           resturantId={elem.resturantId._id}
                           token={this.props.token}
                        />
                     )
                  })}
               </ul>
            </div>
         )
      }
      return (
         <div>
            {
               this.state.loading
                  ? <h2>Loading</h2>
                  : content
            }
         </div>
      )

   }
}

const mapStateToProps = state => {
   return {
      token: state.authReducer.token,
      isResturant: state.authReducer.isResturant,
      formElem: state.menuFormReviewReducer.formElem,
      formValidity: state.menuFormReviewReducer.formValidity
   }
}

export default connect(mapStateToProps)(Order)