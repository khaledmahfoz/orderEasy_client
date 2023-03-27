import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import classes from './Dropdown.module.css'

import Shop from '../UI/Shop/Shop'
import Logout from '../UI/Logout/Logout'

class Dropdown extends Component {
   componentDidMount() {
      document.body.addEventListener('click', this.props.closeDropdownMenu)
   }

   componentWillUnmount() {
      document.body.removeEventListener('click', this.props.closeDropdownMenu)
   }

   redirectOrders = () => {
      this.props.forceCloseDropdownMenu()
      this.props.history.push('/orders')
   }

   logoutHandler = () => {
      this.props.forceCloseDropdownMenu()
      this.props.logoutHandler()
   }

   render() {
      return (
         <div ref={this.props.setDropdownRef} className={classes.Dropdown}>
            {
               <div className={classes.Message}>
                  <div className={classes.Edge}></div>
                  <ul>
                     {
                        !this.props.isResturant
                        && (
                           <li onClick={this.redirectOrders}>
                              <span><Shop /></span>
                              <span>Orders</span>
                           </li>
                        )
                     }
                     <li onClick={this.logoutHandler}>
                        <span><Logout /></span>
                        <span>Logout</span>
                     </li>
                  </ul>
               </div>
            }
         </div>
      )
   }
}

export default withRouter(Dropdown)