import React from 'react'
import StarRatings from 'react-star-ratings'

import classes from './ReviewItem.module.css'

const ReviewItem = props => {
	let d = new Date(props.time)
	return (
		<div className={classes.ReviewItem}>
			<div>
				<p>{props.name}</p>
				<p>{d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()}</p>
				<StarRatings
					rating={props.rate}
					starRatedColor="var(--primeColor)"
					starDimension="1.2rem"
					starSpacing="1px"
					numberOfStars={5}
					name='rating'
				/>
			</div>
			<div>
				<p>{props.content}</p>
			</div>
		</div>
	)
}

export default ReviewItem
