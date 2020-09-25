import React from 'react'
import styled from 'styled-components'

import classes from './Modal.module.css'
import close from '../../../assets/images/close.png'

import Backdrop from '../Backdrop/Backdrop'

const ModalCenter = styled.div`
	position: fixed;
	top: 50%;
	right: 50%;
	transform: translate(50%, -50%);
	background-color: var(--whiteColor);
	width: 600px;
	z-index: 999;
	@media (max-width: 768px) { 
		width: 95%;
		height: auto;
		max-width: 600px;
	}
	
`

const ModalRight = styled.div`
	position: absolute;
	top: 0px;
	right: 0;
	transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-100%)')};
	background-color: var(--whiteColor);
	width: 450px;
	z-index: 999;
	transition: transform 0.3s;
`

const modal = props => {
	let modalCenter = (
		<React.Fragment>
			<Backdrop show={props.show} closeModal={props.closeModal} />
			<ModalCenter center={props.center}>
				<div className={classes.Info}>
					<h3>{props.title}</h3>
					<button onClick={props.closeModal}>
						<img style={{width: '20px'}} src={close} alt='close' />
					</button>
				</div>
				{props.children}
			</ModalCenter>
		</React.Fragment>
	)
	let modalRight = (
		<React.Fragment>
			<Backdrop show={props.show} closeModal={props.closeModal} />
			<ModalRight show={props.show}>
				<div className={classes.Info}>
					<h3>{props.title}</h3>
					<button onClick={props.closeModal}>
						<img style={{width: '20px'}} src={close} alt='close' />
					</button>
				</div>
				{props.children}
			</ModalRight>
		</React.Fragment>
	)
	if (props.center) {
		if (props.show) {
			return modalCenter
		} else {
			return null
		}
	} else {
		return modalRight
	}
}

export default modal
