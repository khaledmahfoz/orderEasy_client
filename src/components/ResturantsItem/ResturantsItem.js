import React from 'react'

import {Link} from 'react-router-dom'

import classes from './ResturantsItem.module.css'

const resturantsItem = props => {
   console.log(props)
   return(
      <div className={classes.Resturants_Item}>
         <div>{props.title}</div>
         <div>{props.desc}</div>
         <div>{props.rate}</div>
         <div>{props.payment[0]}, {props.payment[1]}</div>
         <Link to={{pathname: `/resturant/${props.id}`}}>view</Link>
      </div>
   )
}

export default resturantsItem