import React from 'react'

import classes from './AuthButton.module.css'

const authButton = props => {
	return (
		<button
			type="button"
			style={{backgroundColor: props.color ? props.color : 'var(--primeColor)'}}
			disabled={!props.isValid}
			className={classes.LoginBtn}
			onClick={props.clickHandler}
		>
			{props.children}
		</button>
	)
}

export default authButton
