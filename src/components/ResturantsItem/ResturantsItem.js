import React from 'react'
import {Link} from 'react-router-dom'

import classes from './ResturantsItem.module.css'

import {baseUrl} from '../../util/baseUrl'
import StarRatings from 'react-star-ratings'
import Cash from '../UI/Cash/Cash'

const resturantsItem = props => {
	let imageUrl = baseUrl + props.imgUrl
	return (
		<div className={classes.Resturants_Item}>
			<div
				className={classes.Resturants_Image}
				style={{backgroundImage: `url(${imageUrl})`}}
			>
			</div>
			<div className={classes.Separator}></div>
			<h3 className={classes.Resturants_Title}>{props.title}</h3>
			<p className={classes.Resturants_Description}>{props.description}</p>
			<div className={classes.Resturants_Rate}>
				<StarRatings
					rating={props.rate}
					starRatedColor="var(--primeColor)"
					starDimension="1.4rem"
					starSpacing="1px"
					numberOfStars={5}
					name='makeRatings'
				/>
				<span>({props.reviewers})</span>
			</div>
			<div className={classes.Resturants_Hours}>
				<p>open Hours</p>
				<span>9AM - 5PM</span>
			</div>
			<div className={classes.Resturants_Payment}>
				<p>Payment Methods</p>
				<span><Cash /></span>
			</div>
			<Link
				className={classes.Resturants_Link}
				to={{pathname: `/resturant/${props._id}`}}>
				view
			</Link>
		</div>
	)
}

export default resturantsItem
