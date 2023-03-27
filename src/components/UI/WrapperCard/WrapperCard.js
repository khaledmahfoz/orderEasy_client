import React from 'react'

import classes from './WrapperCard.module.css'

const wrapperCard = props => {
	return (
		<section className={classes.WrapperCard}>
			<div className={classes.WrapperCard_title}>
				<h1 style={{ textAlign: !props.textAlign ? 'left' : props.textAlign }}>
					{props.cardTitle}
				</h1>
			</div>
			{props.children}
		</section>
	)
}

export default wrapperCard
