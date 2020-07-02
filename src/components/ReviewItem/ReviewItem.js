import React from 'react'

import classes from './ReviewItem.module.css'

const ReviewItem = props => {
	return (
		<div className={classes.ReviewItem}>
			<div>
				<span>{props.name}</span>
				<span>{props.time}</span>
				<div>{props.rate}</div>
			</div>
			<div>
				<p>{props.content}</p>
			</div>
		</div>
	)
}

export default ReviewItem
