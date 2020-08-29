import React from 'react'

import classes from './CartItem.module.css'
import PlusCircle from '../../../components/UI/PlusCircle/PlusCircle'
import Plus from '../../../components/UI/Plus/Plus'
import Minus from '../../../components/UI/Minus/Minus'

const CartItem = props => {
   return (
      <div className={classes.CartItem}>
         <div className={classes.CartItemHead}>
            <h6>{props.data.meal}</h6>
            <h6>{props.data.price}$</h6>
            <span onClick={() => props.onToggleItem(props.data, props.Authenticated, props.token)}><PlusCircle inCart={true} /></span>
         </div>
         <div className={classes.CartItemControl}>
            <button disabled={!(props.data.quantity > 1)} onClick={() => props.onDecItem(props.data._id, props.Authenticated, props.token)}><Minus size="1.5rem" /></button>
            <div>{props.data.quantity}</div>
            <button onClick={() => props.onIncItem(props.data._id, props.Authenticated, props.token)}><Plus size="1.5rem" /></button>
         </div>
      </div>
   )
}

export default CartItem