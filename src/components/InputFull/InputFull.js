import React from 'react'

import classes from './InputFull.module.css'

const inputFull = props => {
	return (
		<div className={classes.InputFull}>
			<input
				type='text'
				placeholder='Search For Location'
				onChange={e => props.suggestAddress(e.target.value)}
				onBlur={props.clearInput}
				value={props.address}
			/>
		</div>
	)
}

export default inputFull
