import React from 'react'

import { Link } from 'react-router-dom'

import classes from './ResturantsItem.module.css'

const resturantsItem = props => {
	return (
		<div className={classes.Resturants_Item}>
			<div className={classes.Resturants_Image}></div>
			<h3 className={classes.Resturants_Title}>{props.title}</h3>
			<p className={classes.Resturants_Description}>{props.desc}</p>
			<div className={classes.Resturants_Rate}>{props.rate}</div>
			<div className={classes.Resturants_Payment}>
				{props.payment[0]}, {props.payment[1]}
			</div>
			<Link
				className={classes.Resturants_Link}
				to={{ pathname: `/resturant/${props.id}` }}>
				view
			</Link>
		</div>
	)
}

export default resturantsItem
