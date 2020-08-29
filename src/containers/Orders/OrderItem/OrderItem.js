import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'

import MenuForm from '../../MenuForm/MenuForm'
import classes from '../../MenuForm/MenuForm.module.css'

class OrderItem extends Component {
   state = {
      canReview: !this.props.data.reviewed,
      addReview: false,
      addReviewLoading: false
   }

   menuLoadingHandler = () => {
      this.setState(prevState => {
         return {
            addReviewLoading: !prevState.addReviewLoading
         }
      })
   }

   // componentDidUpdate(prevProps, prevState) {
   //    if (this.props.data.reviewed !== prevState.canReview) {
   //       this.setState({canReview: this.props.data.reviewed})
   //    }
   // }


   reviewHandler = () => {
      this.setState(prevState => {
         return {
            addReview: !prevState.addReview
         }
      })
   }

   // openReviewHandler = () => {
   //    this.setState({addReview: true})
   // }

   closeCanReviewHandler = () => {
      this.setState({addReview: false})
   }

   render() {
      let elem = this.props.data
      return (
         <React.Fragment>
            <li style={{margin: '2rem 0'}}>
               <h3>Meal name: {elem.meal}</h3>
               <h4>Your name: {elem.userId.title}</h4>
               <h5>Resturant title: {elem.resturantId.title}</h5>
               <p>Meal description: {elem.description}</p>
               <p>Price: {elem.price}</p>
               <h6>Time of order: {elem.createdAt}</h6>
               {
                  !this.props.isResturant
                     &&
                     this.state.canReview
                     ? !this.state.addReview
                     &&
                     (
                        <button
                           onClick={this.reviewHandler}
                           className={`${classes.greenBtn} ${classes.customBtn}`}
                        >
                           Add review
                        </button>
                     )
                     : <p>Reviewed</p>
               }

               {
                  this.state.addReview
                  && (
                     <MenuForm
                        review={true}
                        formElem={this.props.formElem}
                        formValidity={this.props.formValidity}
                        resturantId={elem.resturantId}
                        menuLoadingHandler={this.menuLoadingHandler}
                        loadingInd={this.state.addReviewLoading}
                        addReviewLoading={this.state.addReviewLoading}
                        closeEditHandler={this.closeCanReviewHandler}
                        token={this.props.token}
                        orderItemId={elem._id}
                     // itemId={elem.itemId}
                     />
                  )
               }
            </li>
         </React.Fragment>
      )
   }

}

export default OrderItem