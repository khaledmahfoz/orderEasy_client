import React from 'react'

import classes from './SearchBox.module.css'

import SearchItem from './SearchItem/SearchItem'
import {withRouter} from 'react-router-dom'

const searchBox = props => {
	return (
		<div className={classes.SearchBox}>
			<h1>All the food you love in one place</h1>
			<form
				className={classes.AddressForm}
				onSubmit={e => e.preventDefault()}>
				<SearchItem coords={props.coords} address={props.address} choosenCoordsHandler={props.choosenCoordsHandler} findBtnHandler={props.findBtnHandler} btnValue={'Deliver Here'} navigatePath='/resturants' selectBtnValue='Find Resturants' />
			</form>
		</div>
	)
}

export default withRouter(searchBox)
