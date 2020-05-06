import React from 'react'

import classes from './SearchBox.module.css'

import SearchItem from './SearchItem/SearchItem'

const searchBox = props => {
   return(
      <div className={classes.SearchBox}>
         <h1>All the food you love in one place</h1>
         <SearchItem 
            suggestAddress={props.suggestAddress} 
            locateAddress={props.locateAddress}
            address={props.address}
            suggested={props.suggested}
            createMap={props.createMap}
            clearInput={props.clearInput}
            smallLoading={props.smallLoading}/>
      </div>
   )
}

export default searchBox