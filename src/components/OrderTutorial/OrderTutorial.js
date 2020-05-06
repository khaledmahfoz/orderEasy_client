import React from 'react'

import classes from './OrderTutorial.module.css'

import address from "../../assets/images/address.png"
import order from "../../assets/images/order.png"
import deliver from "../../assets/images/deliver.png"

import OrderTutorialItem from './OrderTutorialItem/OrderTutorialItem'

const orderTutorial = () => {
   return(
      <div className={classes.OrderTutorial}>
         <h1>How it works</h1>
         <div className={classes.OrderTutorialItemsWrapper}>
            <OrderTutorialItem title="Choose an address" img={address}/>
            <OrderTutorialItem title="Order your meal" img={order}/>
            <OrderTutorialItem title="Enjoy your food" img={deliver}/>
         </div>
      </div>
   )
}

export default orderTutorial