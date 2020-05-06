import React from 'react'

import classes from './HomeSearch.module.css';
import Background from '../../assets/images/background.jpg'

import SearchBox from '../../components/SearchBox/SearchBox'
import Modal from '../../components/UI/Modal/Modal'
import OrderTutorial from '../../components/OrderTutorial/OrderTutorial'
import Map from '../Map/Map'
import {geocode} from '../Map/Geocode/Geocode'
import Spinner from '../../components/UI/Spinner/Spinner'

class homeSearch extends React.Component{
   state = {
      address: '',
      coords: null,
      suggested: [],
      //ui
      modal: false,
      locate: false,
      loading: false,
      smallLoading: false
   }

   openModal = () => {
      this.setState({modal: true})
   }

   closeModal = () => {
      this.setState({modal: false})
   }

   createMap = (locate, coords) => {
      this.setState({
         locate: locate, 
         coords: coords, 
         suggested: null,
         address: '', 
         loading: false
      })
      this.openModal()
   }

   locateAddress = () => {
      this.setState({loading: true})
      const geo_success = position => {
         this.createMap(true, position.coords)
      }
      const geo_error = () => {
         this.createMap(false, null)
      }
      const geo_options = {
         enableHighAccuracy: true,
         maxAge: 0,
         timeout: 30000
      }
      navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
   }

   suggestAddress = (e) => {
      this.setState({address: e.target.value, smallLoading: true})
      geocode(e.target.value, cb => {
         this.setState({suggested: cb.items, smallLoading: false})
      })   
   }

   clearInput = (e) => {
      console.log(e.target.tagName.toUpperCase())
   }

   render(){
      console.log(this.props.history)
      return(
         <React.Fragment>
            <Modal show={this.state.modal} closeModal={this.closeModal}>
               <React.Fragment>
                  <input />
                  {
                     !this.state.locate ? 
                     "sorry" : 
                     <Map coords={this.state.coords}/>
                  }
               </React.Fragment>
            </Modal>
            <div className={classes.HomeSearch} 
               style={{backgroundImage: `url(${Background})`}}>
               <div className={classes.OverLay}></div>
               <SearchBox
                  suggestAddress={this.suggestAddress} 
                  locateAddress={this.locateAddress}
                  address={this.state.address}
                  suggested={this.state.suggested}
                  createMap={this.createMap}
                  clearInput={this.clearInput}
                  smallLoading={this.state.smallLoading}/>
            </div>
            <OrderTutorial />
            {this.state.loading ? <Spinner /> : null}
         </React.Fragment>
      )
   }
}

export default homeSearch