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

   closeCanReviewHandler = () => {
      this.setState({addReview: false})
   }

   render() {
      let elem = this.props.data
      return (
         <React.Fragment>
            <li style={{margin: '2rem 0'}}>
               <p>Meal name: <span>{elem.meal}</span></p>
               {!this.props.isResturant ? <p>Your name: <span>{elem.userId.title}</span></p> : null}
               {!this.props.isResturant && <p>Resturant title: <span>{elem.resturantId.title}</span></p>}
               <p>Meal description: <span>{elem.description}</span></p>
               <p>Price: <span>{elem.price}</span></p>
               <p>Time of order: <span>{elem.createdAt}</span></p>
               {
                  this.state.canReview
                     ?
                     this.props.isResturant
                        ? <span className="badge badge-warning">Not Reviewed</span>
                        : !this.state.addReview
                           ?
                           (
                              <button
                                 onClick={this.reviewHandler}
                                 className={`${classes.greenBtn} ${classes.customBtn}`}
                                 style={{width: '120px', height: '40px'}}
                              >
                                 Add review
                              </button>
                           )
                           :
                           (
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
                              />
                           )
                     : <span className="badge badge-primary">Reviewed</span>
               }

            </li>
         </React.Fragment>
      )
   }

}

export default OrderItem