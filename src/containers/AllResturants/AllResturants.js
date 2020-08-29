import React from 'react'

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
            console.log(resturants)
            this.setState({resturants: resturants, loading: false})
         })
         .catch(err => {
            console.log(err)
         })
   }
   render() {
      let resturantsResult = (
         <div className={classes.Resturant}>
            <Spinner />
         </div>
      )
      if (this.state.resturants) {
         let resturantsArr = this.state.resturants.map(elem => {
            return <ResturantsItem {...elem} key={elem._id} />
         })
         resturantsResult = (
            <div className="container" style={{
               padding: '2rem'
            }}>
               {resturantsArr}
            </div>
         )
      }
      return resturantsResult
   }
}

export default AllResturants
