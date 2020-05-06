import React from 'react'

import classes from './Navbar.module.css';

import {Link} from 'react-router-dom'

const navbar = props => {
   return(
      <div className={classes.Navbar}>
         <div className={classes.Logo}>
            <Link to="/">Logo</Link>
         </div>
         <div className={classes.List}>
            <ul>
               <li><Link to="/resturants">Resturants</Link></li>
               <li>Sign in</li>
               <li>Cart</li>
            </ul>
         </div>
      </div>
   )
}

export default navbar