import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import classes from '../../components/AuthLogin/AuthLogin.module.css'

import * as actionTypes from '../../store/actions/actionTypes'
import {baseUrl} from '../../util/baseUrl'
import {validateForm} from '../../util/validationSchema'
import FormInput from '../UI/FormInput/FormInput'
import AuthButton from '../UI/AuthButton/AuthButton'
import SectionSpinner from '../UI/SectionSpinner/SectionSpinner'
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'

class AuthLogin extends Component {
	state = {
		formElem: {
			email: {
				elemType: 'input',
				value: '',
				config: {
					type: 'email',
					placeholder: 'Enter your email',
				},
				valid: false,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Please enter your email'
					},
					email: {
						value: true,
						message: 'Please enter a valid email'
					}
				}
			},
			password: {
				elemType: 'input',
				value: '',
				config: {
					type: 'password',
					placeholder: 'Enter your password',
				},
				valid: false,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Please enter your password'
					},
					minLength: {
						value: 6,
						message: 'Password should be atleast 6 characters'
					},
					maxLength: {
						value: 15,
						message: 'Password shouldn\'t exceed 15 characters'
					}
				}
			},
		},
		isResturant: false,
		formValidity: false,
	}

	signupLinkHandler = () => {
		this.props.showModalHandler && this.props.showModalHandler()
		this.props.history.push('/signup')
	}

	changeHandler = (value, identifier) => {
		this.props.errMessage && this.props.onAuthClear()
		let updatedFormElem = {
			...this.state.formElem,
		}

		let updatedElem = {
			...updatedFormElem[identifier],
		}
		updatedElem.value = value
		let validation = validateForm(value, updatedElem.validationConfig)
		updatedElem.valid = validation.isValid
		updatedElem.message = validation.message
		updatedFormElem[identifier] = updatedElem

		let formValidity = true
		for (let identifier in updatedFormElem) {
			formValidity = updatedFormElem[identifier].valid && formValidity
		}
		this.setState({formElem: updatedFormElem, formValidity: formValidity})
	}

	isResturantHandler = () => {
		this.setState(prevState => ({isResturant: !prevState.isResturant}))
		this.props.errMessage && this.props.onAuthClear()
	}

	loginHandler = () => {
		if (this.state.formValidity && !this.props.errMessage) {
			const data = {
				email: this.state.formElem.email.value,
				password: this.state.formElem.password.value,
				isResturant: this.state.isResturant,
				cart: JSON.parse(localStorage.getItem('cart'))
			}
			this.props.onAuthStart()
			fetch(baseUrl + 'login', {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				body: JSON.stringify(data)
			})
				.then(res => {
					// if (res.status !== 200) {
					// 	throw new Error('something went wrong')
					// }
					return res.json()
				})
				.then(result => {
					if (result.status === 401) {
						throw new Error(result.message)
					}
					if (result.status !== 200) {
						throw new Error('can\'t login right now please try again later')
					}
					let {token, id, isResturant, title, cart} = result
					localStorage.setItem("token", token)
					localStorage.setItem("id", id)
					localStorage.setItem("isResturant", isResturant)
					localStorage.setItem("title", title)

					this.props.onAuthSuccess(token, id, isResturant, title)

					if (!this.props.checkSwap) {
						this.props.showModalHandler && this.props.showModalHandler()
						if (isResturant) {
							this.props.history.push('/my-resturant/' + id)
						} else {
							this.props.setCart && this.props.setCart(cart)
							localStorage.setItem('cart', JSON.stringify(cart))
							this.props.history.push('/')
						}
					} else {
						if (isResturant) {
							this.props.history.push('/my-resturant/' + id)
						} else {
							this.props.swipeContent(true)
							this.props.checkSwapHandler()
							this.props.setCart(cart)
							localStorage.setItem('cart', JSON.stringify(cart))
							this.props.history.push('/')
						}
					}
				})
				.catch(err => {
					this.props.onAuthFailed(err.message)
				})
		} else {
			let updatedFormElem = {
				...this.state.formElem,
			}
			for (let identifier in updatedFormElem) {
				let updatedElem = {
					...updatedFormElem[identifier],
				}
				let validation = validateForm(updatedElem.value, updatedElem.validationConfig)
				updatedElem.valid = validation.isValid
				updatedElem.message = validation.message
				updatedFormElem[identifier] = updatedElem
			}
			this.setState({formElem: updatedFormElem})
		}
	}

	clearFields = () => {
		let updatedFormElem = {
			...this.state.formElem,
		}
		for (let identifier in updatedFormElem) {
			let updatedElem = {
				...updatedFormElem[identifier],
			}
			updatedElem.value = ''
			updatedElem.message = null
			updatedElem.valid = false
			updatedFormElem[identifier] = updatedElem
		}
		this.setState({formElem: updatedFormElem, isResturant: false})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.showModal !== this.props.showModal) {
			this.props.errMessage && this.props.onAuthClear()
			this.clearFields()
		}
	}

	render() {
		return this.props.loading ?
			<div style={{height: '289px', position: 'relative'}}>
				<SectionSpinner />
			</div>
			:
			(
				<form
					onSubmit={e => e.preventDefault()}
					className={`${classes.AuthLoginForm} ${this.props.custom && classes.AuthLoginFormConfig}`}>
					<h3>Login</h3>
					{Object.keys(this.state.formElem).map(elem => {
						return (
							<div key={elem}>
								<FormInput
									identifier={elem}
									elemType={this.state.formElem[elem].elemType}
									config={this.state.formElem[elem].config}
									value={this.state.formElem[elem].value}
									changeHandler={this.changeHandler}
								/>
								{
									!this.state.formElem[elem].valid ?
										<ErrorMessage>
											{this.state.formElem[elem].message}
										</ErrorMessage>
										: null
								}
							</div>
						)
					})}
					{
						this.props.errMessage ?
							<ErrorMessage>{this.props.errMessage}</ErrorMessage>
							: null
					}
					<div className={classes.isResturantCheck}>
						<input type="checkbox" onChange={this.isResturantHandler} checked={this.state.isResturant} />
						<label>I'm a resturant!</label>
					</div>
					<AuthButton isValid={this.state.formValidity && !this.props.errMessage} clickHandler={this.loginHandler}>
						Login
					</AuthButton>
					<div className={classes.SignupInfo}>
						<p>Don't have an account?</p>
						<button
							type="button"
							className={classes.Signup}
							onClick={this.signupLinkHandler}>
							sign up
					</button>
					</div>
				</form>
			)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.authReducer.loading,
		errMessage: state.authReducer.error,
		token: state.authReducer.token,
		Authenticated: state.authReducer.token !== null,
		cart: state.cartReducer.cart,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthClear: () => dispatch({type: actionTypes.AUTH_CLEAR}),
		onAuthStart: () => dispatch({type: actionTypes.START_AUTH}),
		onAuthSuccess: (token, id, isResturant, title) => dispatch({type: actionTypes.AUTH_SUCCESS, token, id, isResturant, title}),
		setCart: (cart) => dispatch({type: actionTypes.SET_CART, cart: cart}),
		onAuthFailed: (error) => dispatch({type: actionTypes.AUTH_FAILED, error})
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthLogin))
