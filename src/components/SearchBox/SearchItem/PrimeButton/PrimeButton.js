import React from 'react'

import classes from './PrimeButton.module.css'

const primeButton = props => {
	return (
		<button className={classes.ResturantBtn} onClick={props.clickHandler}>
			{props.children}
		</button>
	)
}

export default primeButton
