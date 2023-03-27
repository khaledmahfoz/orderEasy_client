import React, {Component} from 'react'
import {connect} from 'react-redux'
import StarRatings from 'react-star-ratings'

import classes from '../Resturant/Resturant.module.css'

import * as actionTypes from '../../store/actions/actionTypes'
import Cash from '../../components/UI/Cash/Cash'
import Hero from '../../components/Hero/Hero'
import SectionSpinner from '../../components/UI/SectionSpinner/SectionSpinner'
import ResturantReviews from '../../components/ResturantReviews/ResturantReviews'
import Menu from '../../components/Menu/Menu'
import {baseUrlAdmin, baseUrl} from '../../util/baseUrl'

class MyResturant extends Component {
   state = {
      resturant: null,
      menu: null,
      loading: true,
      menuLoading: false,
      showReviews: false,
   }

   menuLoadingHandler = () => {
      this.setState(prevState => {
         return {menuLoading: !prevState.menuLoading}
      })
   }

   updatedFinishedHandler = (updatedRes) => {
      this.setState({menu: updatedRes.menu})
   }

   componentDidMount() {
      this.props.onSetErrorOff()
      fetch(baseUrlAdmin + 'my-resturant/' + this.props.match.params.id, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
         }
      })
         .then(res => {
            if (res.status !== 200) {
               this.props.history.replace('/404')
            }
            return res.json()
         })
         .then(resturant => {
            this.setState({loading: false, resturant, menu: resturant.menu})
         })
         .catch(err => {
            this.setState({loading: false})
            this.props.onSetErrorOn(err.message)
         })
   }

   menuSwapContentHandler = () => {
      this.setState(prevState => {
         return {showReviews: !prevState.showReviews}
      })
   }

   render() {
      let menuSwapContent
      if (this.state.resturant) {
         if (!this.state.showReviews) {
            menuSwapContent = (
               <Menu
                  menu={this.state.menu}
                  resturantId={this.state.resturant._id}
                  isResturant={this.props.isResturant}
                  menuLoading={this.state.menuLoading}
                  menuLoadingHandler={this.menuLoadingHandler}
                  updatedFinishedHandler={this.updatedFinishedHandler}
               />
            )
         } else {
            menuSwapContent = (
               <ResturantReviews reviews={this.state.resturant.reviews} />
            )
         }
      }
      return !this.state.resturant ? (
         <div style={{minHeight: '500px', position: 'relative'}}>
            <SectionSpinner />
         </div>
      ) : (
            <React.Fragment>
               <header className={classes.Header}>
                  <Hero classes={classes.Hero_Config}></Hero>
                  <div className={`${classes.Lip_Section} ${this.state.menu && classes.Lip_Section_Config}`}>
                     <div className={`${classes.Lip_Content} ${!this.state.menu && classes.Lip_Content_Config}`}>
                        <div className={classes.Resturant_Img} style={{backgroundImage: `url(${baseUrl + this.state.resturant.imgUrl})`}}>
                        </div>
                        <h3 className={classes.Title}>{this.state.resturant.title}</h3>
                        <p className={classes.Desc}>{this.state.resturant.description}</p>
                        <div className={classes.Rate}>
                           <StarRatings
                              rating={this.state.resturant.rate}
                              starRatedColor="var(--primeColor)"
                              starDimension="1.4rem"
                              starSpacing="1px"
                              numberOfStars={5}
                              name='makeRatings'
                           />
                           <span>({this.state.resturant.reviewers})</span>
                        </div>
                        <p className={classes.Main}>{this.state.resturant.catagory}</p>
                        <div className={classes.Hours}>
                           <p>open hours</p>
                           <span>9AM - 5PM</span>
                        </div>
                        <div className={classes.Payment}>
                           <p>payment Methods</p>
                           <span><Cash /></span>
                        </div>
                     </div>

                  </div>
               </header>
               <div className={classes.ResWrapper}>
                  <React.Fragment>
                     <button className={classes.SwapBtn} onClick={this.menuSwapContentHandler}>
                        {!this.state.showReviews ? 'Swap to Reviews !' : 'Swap to Menu !'}
                     </button>
                     {menuSwapContent}
                  </React.Fragment>
               </div>
            </React.Fragment>
         )

   }
}

const mapStateToProps = state => {
   return {
      isResturant: state.authReducer.isResturant,
      token: state.authReducer.token
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
      onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyResturant)