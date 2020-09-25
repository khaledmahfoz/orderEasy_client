import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import classes from './SideNav.module.css'

import Backdrop from '../UI/Backdrop/Backdrop'

const SideNav = (props) => {
   const logoutHandler = () => {
      props.logoutHandler()
      props.history.replace('/')
      props.toggleSideNav()
   }

   // const loginHandler = () => {
   //    props.history.push('/')
   // }
   return (
      <React.Fragment>
         <Backdrop show={props.sideNav} closeModal={props.toggleSideNav} />
         <ul className={classes.SideNav} style={{transform: props.sideNav ? 'translateX(0)' : 'translateX(-100%)'}}>

            {
               !props.isResturant
               && (
                  <React.Fragment>
                     <div className={classes.Title}>Hi, {props.title ? props.title : 'stranger'}</div>
                     <li>
                        <Link to='/all-resturants' onClick={props.toggleSideNav}>Resturants</Link>
                     </li>
                     <li>
                        <Link to='/cart' onClick={props.toggleSideNav}>Cart</Link>
                     </li>
                  </React.Fragment>
               )
            }
            {
               !props.Authenticated
               && (
                  <React.Fragment>
                     <li>
                        <Link to='/login' onClick={props.toggleSideNav}>Login</Link>
                     </li>
                     <li>
                        <Link to='/signup' onClick={props.toggleSideNav}>Signup</Link>
                     </li>
                  </React.Fragment>
               )
            }
            {
               props.Authenticated
               && (
                  <React.Fragment>

                     <li>
                        <Link to='/orders' onClick={props.toggleSideNav}>Orders</Link>
                     </li>
                     <li onClick={logoutHandler}>
                        Logout
                     </li>
                  </React.Fragment>
               )
            }

         </ul>
      </React.Fragment>
   )
}

export default withRouter(SideNav)