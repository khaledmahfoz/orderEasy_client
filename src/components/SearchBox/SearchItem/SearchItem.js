import React from 'react'

import classes from './SearchItem.module.css'
import LocateIcon from '../../../assets/images/locate_gps2.png'

import {SmallLoadingMenu} from '../../UI/SmallLoading/SmallLoading'
import SearchList from '../SearchItem/SearchList/SearchList'
// import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

const searchItem = props => {
   console.log(props.history)
   return(
      <form onSubmit={(e) => e.preventDefault()}>
         <div className={classes.AddressInput}>
            <input 
               type='text' 
               placeholder="Please search for your location"
               onChange = {props.suggestAddress}
               onBlur={props.clearInput}
               value={props.address}
            />
            {
               props.smallLoading ? 
                  <SmallLoadingMenu color="#f86932"/>
               : 
                  <a className={classes.LocateBtn} onClick={props.locateAddress}>
                     <img src={LocateIcon} alt="locate" draggable="false"/>
                  </a>
            }
            
            {
               props.address ? 
                  <SearchList createMap={props.createMap} suggested={props.suggested} /> 
               : null
            }
         </div>
         <button 
            className={classes.ResturantBtn} 
            onClick={() => props.history.push('/resturants')}
         >
            Find Resturants
         </button>
      </form>
   )
}

export default withRouter(searchItem)