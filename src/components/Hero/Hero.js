import React from 'react'

import classes from './Hero.module.css'
import Background from '../../assets/images/background.jpg'

import styled from 'styled-components'

const Hero = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-image: url(${Background});
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
`

const hero = props => {
	return (
		<Hero className={props.classes ? props.classes : ''}>
			<div className={classes.OverLay}></div>
			{props.children}
		</Hero>
	)
}

export default hero
