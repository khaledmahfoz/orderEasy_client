import React from 'react'

import classes from './CartItem.module.css'
import {SmallLoading} from '../../../components/UI/SmallLoading/SmallLoading'
import PlusCircle from '../../../components/UI/PlusCircle/PlusCircle'
import Plus from '../../../components/UI/Plus/Plus'
import Minus from '../../../components/UI/Minus/Minus'


class CartItem extends React.Component {
   state = {
      loading: false
   }

   stopLoading = () => {
      this.setState({loading: false})
   }

   startLoading = () => {
      this.setState({loading: true})
   }

   render() {
      return (
         <div className={classes.CartItem}>
            <div className={classes.CartItemHead}>
               <h6>{this.props.data.meal}</h6>
               <h6>{this.props.data.price}$</h6>

               {
                  this.state.loading
                     ? (
                        <span>
                           <SmallLoading color="var(--red)" />
                        </span>
                     )
                     : (
                        <span onClick={() => this.props.onToggleItem(this.props.data, this.props.Authenticated, this.props.token, this.startLoading, this.stopLoading)}>
                           <PlusCircle inCart={true} />
                        </span>
                     )
               }

            </div>
            <div className={classes.CartItemControl}>
               <button disabled={!(this.props.data.quantity > 1) || this.state.loading} onClick={() => this.props.onDecItem(this.props.data._id, this.props.Authenticated, this.props.token, this.startLoading, this.stopLoading)}><Minus size="1.5rem" /></button>
               <div>{this.props.data.quantity}</div>
               <button onClick={() => this.props.onIncItem(this.props.data._id, this.props.Authenticated, this.props.token, this.startLoading, this.stopLoading)} disabled={this.state.loading}><Plus size="1.5rem" /></button>
            </div>
         </div>
      )
   }
}

export default CartItem