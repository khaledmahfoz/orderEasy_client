import React from 'react'
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions/actionTypes'
import {baseUrl} from '../../util/baseUrl'
import Spinner from '../../components/UI/Spinner/Spinner'
import ResturantsItem from '../../components/ResturantsItem/ResturantsItem'
import classes from '../Resturants/Resturants.module.css'

class AllResturants extends React.Component {
   state = {
      resturants: null,
      loading: true,
   }
   componentDidMount() {
      this.props.onSetErrorOff()
      fetch(baseUrl + 'all-resturants', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })
         .then(res => {
            if (res.status !== 200) {
               throw new Error('something went wrong')
            }
            return res.json()
         })
         .then(resturants => {
            this.setState({resturants: resturants, loading: false})
         })
         .catch(err => {
            this.setState({loading: false})
            this.props.onSetErrorOn(err.message)
         })
   }
   render() {
      let resturantsResult
      if (this.state.loading) {
         resturantsResult = (
            <div className={classes.Resturant}>
               <Spinner />
            </div>
         )
      } else if (this.state.resturants) {
         let resturantsArr = this.state.resturants.map(elem => {
            return <ResturantsItem {...elem} key={elem._id} />
         })
         resturantsResult = (
            <div className="container">
               {resturantsArr}
            </div>
         )
      } else {
         resturantsResult = null
      }

      return resturantsResult
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
      onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
   }
}

export default connect(null, mapDispatchToProps)(AllResturants)
