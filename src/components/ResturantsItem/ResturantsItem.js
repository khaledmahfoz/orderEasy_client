import React from 'react'

import {Link} from 'react-router-dom'

import classes from './ResturantsItem.module.css'

const resturantsItem = props => {
	let imageUrl = 'http://localhost:8080/' + props.imgUrl
	return (
		<div className={classes.Resturants_Item}>
			<div
				className={classes.Resturants_Image}
				style={{backgroundImage: `url(${imageUrl})`}}
			>
			</div>
			<h3 className={classes.Resturants_Title}>{props.title}</h3>
			<p className={classes.Resturants_Description}>{props.description}</p>
			<div className={classes.Resturants_Rate}>{props.rate}</div>
			<div className={classes.Resturants_Payment}>
				{props.paymentMethod}
			</div>
			<Link
				className={classes.Resturants_Link}
				to={{pathname: `/resturant/${props.id}`}}>
				view
			</Link>
		</div>
	)
}

export default resturantsItem
