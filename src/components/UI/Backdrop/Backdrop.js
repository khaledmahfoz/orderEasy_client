import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = props => {
	let backdropResult = null
	if (props.show && props.closeModal) {
		backdropResult = (
			<div className={classes.Backdrop} onClick={props.closeModal}></div>
		)
	} else if (props.show && !props.closeModal) {
		backdropResult = <div className={classes.Backdrop}></div>
	}
	return backdropResult
}

export default backdrop
