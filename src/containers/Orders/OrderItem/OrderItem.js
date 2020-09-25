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


   alreadyReviewed = () => {
      this.setState({canReview: false})
   }

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
               <p>Meal name: <span>{elem.meal}</span></p>
               <p>Your name: <span>{elem.userId.title}</span></p>
               <p>Resturant title: <span>{elem.resturantId.title}</span></p>
               <p>Meal description: <span>{elem.description}</span></p>
               <p>Price: <span>{elem.price}</span></p>
               <p>Time of order: <span>{elem.createdAt}</span></p>
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
                           style={{width: '120px', height: '40px'}}
                        >
                           Add review
                        </button>
                     )
                     : <span className="badge badge-primary">Reviewed</span>
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
                        alreadyReviewed={this.alreadyReviewed}
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