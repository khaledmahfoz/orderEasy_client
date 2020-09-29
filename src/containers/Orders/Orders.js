import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

import classes from './Orders.module.css'

import * as actionTypes from '../../store/actions/actionTypes'
import MenuForm from '../MenuForm/MenuForm'
import OrderItem from './OrderItem/OrderItem'
import {baseUrl} from '../../util/baseUrl'
import SectionSpinner from '../../components/UI/SectionSpinner/SectionSpinner'


class Order extends Component {
   state = {
      orders: null,
      loading: false,
   }

   componentDidMount() {
      this.props.onSetErrorOff()
      this.setState({loading: true})
      fetch(baseUrl + `get-orders/?isResturant=${this.props.isResturant}`, {
         method: "GET",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
         },
      })
         .then(res => {
            if (res.status !== 200) {
               throw new Error('something went wrong')
            }
            return res.json()
         })
         .then(orders => {
            this.setState({loading: false, orders})
         })
         .catch(err => {
            this.setState({loading: false})
            this.props.onSetErrorOn(err.message)
         })

   }
   render() {
      let content = <div style={{height: '500px', minHeight: '300px', fontSize: '2rem'}} className="w-100 d-flex justify-content-center align-items-center">No orders here</div>
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

const mapDispatchToProps = dispatch => {
   return {
      onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
      onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)