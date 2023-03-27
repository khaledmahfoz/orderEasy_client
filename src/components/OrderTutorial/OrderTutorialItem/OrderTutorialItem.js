import React from 'react'

import classes from './OrderTutorialItem.module.css'

const OrderTutorialItem = props => {
   return(
      <div className={classes.OrderTutorialItem}>
         <img src={props.img} draggable="false" alt={props.img}/>
         <p>{props.title}</p>
      </div>
   )
}

export default OrderTutorialItem