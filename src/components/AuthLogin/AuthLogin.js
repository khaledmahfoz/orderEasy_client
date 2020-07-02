import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classes from '../../components/AuthLogin/AuthLogin.module.css'

import FormInput from '../UI/FormInput/FormInput'
import AuthButton from '../UI/AuthButton/AuthButton'

class AuthLogin extends Component {
	state = {
		formElem: {
			email: {
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'email',
					placeholder: 'Enter your email',
				},
			},
			password: {
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'password',
					placeholder: 'Enter your password',
				},
			},
		},
	}
	changeHandler = (value, identifier) => {
		let updatedFormElem = {
			...this.state.formElem,
		}
		let updatedElem = {
			...updatedFormElem[identifier],
		}
		updatedElem.value = value
		updatedFormElem[identifier] = updatedElem
		this.setState({ formElem: updatedFormElem })
	}
	render() {
		return (
			<form
				onSubmit={e => e.preventDefault()}
				className={classes.AuthLoginForm}>
				{Object.keys(this.state.formElem).map(elem => {
					return (
						<FormInput
							key={elem}
							identifier={elem}
							elemType={this.state.formElem[elem].elemType}
							config={this.state.formElem[elem].config}
							value={this.state.formElem[elem].value}
							changeHandler={this.changeHandler}
						/>
					)
				})}
				<AuthButton>Login</AuthButton>
				<div className={classes.SignupInfo}>
					<p>Don't have an account?</p>
					<button
						className={classes.Signup}
						onClick={this.props.signupLinkHandler}>
						sign up
					</button>
				</div>
			</form>
		)
	}
}

export default AuthLogin
