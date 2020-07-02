import React from 'react'

import classes from './SearchBox.module.css'

import SearchItem from './SearchItem/SearchItem'
import { withRouter } from 'react-router-dom'

const searchBox = props => {
	return (
		<div className={classes.SearchBox}>
			<h1>All the food you love in one place</h1>
			{/* <SearchItem
				suggestAddress={props.suggestAddress}
				locateAddress={props.locateAddress}
				address={props.address}
				suggested={props.suggested}
				createMap={props.createMap}
				clearInput={props.clearInput}
				smallLoading={props.smallLoading}
				clickHandler={() => props.history.push('/resturants')}
				btnValue='Find Resturants'
			/> */}
			<SearchItem navigatePath='/resturants' btnValue='Find Resturants' />
		</div>
	)
}

export default withRouter(searchBox)
