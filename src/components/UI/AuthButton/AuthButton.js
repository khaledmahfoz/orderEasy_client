import React from 'react'

import classes from './AuthButton.module.css'

const authButton = props => {
	return <button className={classes.LoginBtn} onClick={props.clickHandler}>{props.children}</button>
}

export default authButton
