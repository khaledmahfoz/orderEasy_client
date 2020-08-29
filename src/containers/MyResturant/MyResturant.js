import React, {Component} from 'react'
import {connect} from 'react-redux'
import StarRatings from 'react-star-ratings'

import classes from '../Resturant/Resturant.module.css'

import Hero from '../../components/Hero/Hero'
import SectionSpinner from '../../components/UI/SectionSpinner/SectionSpinner'
import ResturantReviews from '../../components/ResturantReviews/ResturantReviews'
import Menu from '../../components/Menu/Menu'
import {baseUrlAdmin} from '../../util/baseUrl'

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
            console.log(resturant.menu)
            this.setState({loading: false, resturant, menu: resturant.menu})
         })
         .catch(err => console.log(err))
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
         <div style={{minHeight: 'calc(100vh - 358px)', position: 'relative'}}>
            <SectionSpinner />
         </div>
      ) : (
            <React.Fragment>
               <header className={classes.Header}>
                  <Hero height='500px'></Hero>
                  <div className={classes.Lip_Section}>
                     <div className={classes.Lip_Content}>
                        <div className={classes.Resturant_Img} style={{backgroundImage: `url(${'http://localhost:8080/' + this.state.resturant.imgUrl})`}}>
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
                           {/* {this.state.resturant.rate} */}
                        </div>
                        <p className={classes.Main}>{this.state.resturant.catagory}</p>
                        <div className={classes.Hours}>
                           <p>open hours</p>
                           <p>{this.state.resturant.openHours}</p>
                        </div>
                        <div className={classes.Payment}>
                           <p>payment Methods</p>
                           <div>{this.state.resturant.payment}</div>
                        </div>
                     </div>

                  </div>
               </header>
               <div className='container'>
                  <React.Fragment>
                     <button onClick={this.menuSwapContentHandler}>
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


export default connect(mapStateToProps)(MyResturant)