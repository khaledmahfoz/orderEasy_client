import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

import MenuForm from '../MenuForm/MenuForm'
import OrderItem from './OrderItem/OrderItem'
import {baseUrl} from '../../util/baseUrl'
import SectionSpinner from '../../components/UI/SectionSpinner/SectionSpinner'

import classes from './Orders.module.css'

class Order extends Component {
   state = {
      orders: null,
      loading: false,
   }

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
            this.setState({loading: false, orders})
         })
         .catch(err => console.log(err))

   }
   render() {
      let content = <div style={{height: '100vh', minHeight: '300px', fontSize: '2rem'}} className="w-100 d-flex justify-content-center align-items-center">No orders here</div>
      if (this.state.orders && this.state.orders.length) {
         content = (
            <div className="container">
               <ul className={classes.OrdersList}>
                  {this.state.orders.map(elem => {
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
                  ? <div style={{height: '100vh', minHeight: '300px', position: 'relative'}}><SectionSpinner color="var(--primeColor)" /></div>
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