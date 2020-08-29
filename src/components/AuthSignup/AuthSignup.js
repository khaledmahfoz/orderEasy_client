import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import classes from './AuthSignup.module.css'

import * as actionTypes from '../../store/actions/actionTypes'
import WrapperCard from '../UI/WrapperCard/WrapperCard'
import Chevron from '../UI/Chevron/Chevron'
import FormInput from '../UI/FormInput/FormInput'
import AuthButton from '../UI/AuthButton/AuthButton'
import SearchItem from '../SearchBox/SearchItem/SearchItem'
import FilePicker from '../UI/FilePicker/FilePicker'
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'
import {baseUrl} from '../../util/baseUrl'
import {validateForm} from '../../util/validationSchema'

class AuthSignup extends Component {
	constructor(props) {
		super(props)
		this.fileRef = React.createRef()
	}
	state = {
		showCheck: true,
		isResturant: true,
		userValidity: false,
		formValidity: false,
		userFormElem: {
			fullName: {
				name: 'title',
				label: 'Full Name',
				elemType: 'input',
				value: '',
				config: {
					type: 'text',
				},
				valid: false,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Please enter your full name'
					},
					minLength: {
						value: 5,
						message: 'Name should be atleast 5 characters'
					},
					maxLength: {
						value: 15,
						message: 'Name shouldn\'t exceed 15 characters'
					}
				}
			},
			email: {
				name: 'email',
				label: 'Email',
				elemType: 'input',
				value: '',
				config: {
					type: 'email',
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
				name: 'password',
				label: 'Password',
				elemType: 'input',
				value: '',
				message: null,
				config: {
					type: 'password',
				},
				valid: false,
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
			confirmPassword: {
				name: 'confirmPassword',
				label: 'Confirm Password',
				elemType: 'input',
				value: '',
				config: {
					type: 'password',
				},
				valid: false,
				message: null,
				touched: false,
				validationConfig: {
					required: {
						value: true,
						message: 'Please repeat your password here'
					},
					match: {
						value: '',
						message: 'Confirm password doesn\'t match the given password'
					},
				}
			},
		},
		resturantFormElem: {
			catagory: {
				name: 'catagory',
				label: 'Catagory',
				elemType: 'select',
				value: 'Mixed cusine',
				valid: true,
				message: null,
				validationConfig: {},
				config: {
					options: [
						{value: 'Mixed cusine'},
						{value: 'Spanish cusine'},
						{value: 'Moroccan cusine'},
						{value: 'Japanese cusine'},
						{value: 'Thai cusine'},
						{value: 'Indian cusine'},
						{value: 'Italian cusine'},
						{value: 'French cusine'}
					],
				},
			},
			description: {
				name: 'description',
				label: 'Enter a brief description',
				elemType: 'textarea',
				value: '',
				valid: false,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Please provide a brief description'
					},
					minLength: {
						value: 10,
						message: 'description should be atleast 10 characters'
					},
					maxLength: {
						value: 30,
						message: 'description shouldn\'t exceed 30 characters'
					}
				}
			},
			file: {
				elemType: 'file',
				selectedFile: null,
				filename: '',
				valid: false,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Please provide an image for the resturant'
					},
					imgType: {
						value: true,
						message: 'Resturant image must be Png, Jpg and Jpeg only'
					}
				}
			},
			coords: {
				// choosenCoords: this.props.choosenCoords,
				choosenCoords: this.props.coords,
				address: this.props.address,
				valid: false,
				message: null,
				validationConfig: {
					requiredCoords: {
						value: true,
						message: 'Please provide a valid location'
					},
				}
			}
		},
	}

	validateFormHandler = () => {
		let updatedFormElem = {
			...this.state.userFormElem,
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
		this.setState({userFormElem: updatedFormElem})
		let updatedResturantFormElem = {
			...this.state.resturantFormElem,
		}
		for (let identifier in updatedResturantFormElem) {
			let updatedElem = {
				...updatedResturantFormElem[identifier],
			}
			let validation
			if (identifier === 'file') {
				validation = validateForm(updatedElem.selectedFile, updatedElem.validationConfig)
			} else if (identifier === 'coords') {
				console.log(updatedElem.choosenCoords, updatedElem.validationConfig)
				let data = {coords: this.props.coords, address: this.props.address}
				validation = validateForm(data, updatedElem.validationConfig)
			} else {
				validation = validateForm(updatedElem.value, updatedElem.validationConfig)
			}

			updatedElem.valid = validation.isValid
			updatedElem.message = validation.message
			updatedResturantFormElem[identifier] = updatedElem
		}
		this.setState({resturantFormElem: updatedResturantFormElem})
	}

	clickHandler = () => {
		if (!this.state.isResturant) {
			if (this.state.userValidity) {
				const formData = new FormData()
				formData.append('title', this.state.userFormElem.fullName.value)
				formData.append('email', this.state.userFormElem.email.value)
				formData.append('password', this.state.userFormElem.password.value)
				formData.append('confirmPassword', this.state.userFormElem.confirmPassword.value)
				fetch(`${baseUrl}add-user`, {
					method: 'POST',
					body: formData
				})
					.then(response => response.json())
					.then(data => {
						if (data.status === 422) {
							this.validateFormHandler()
						}
						console.log(data)
						this.props.history.push('/')
					})
					.catch(err => {
						console.log(err)
					})
			} else {
				let updatedFormElem = {
					...this.state.userFormElem,
				}
				for (let identifier in updatedFormElem) {
					let updatedElem = {
						...updatedFormElem[identifier],
					}
					console.log(updatedElem, identifier)
					let validation = validateForm(updatedElem.value, updatedElem.validationConfig)
					updatedElem.valid = validation.isValid
					updatedElem.message = validation.message
					updatedFormElem[identifier] = updatedElem
				}
				this.setState({userFormElem: updatedFormElem})
			}
		} else {
			if (this.state.userValidity && this.state.formValidity) {
				const formData = new FormData()
				formData.append('title', this.state.userFormElem.fullName.value)
				formData.append('email', this.state.userFormElem.email.value)
				formData.append('password', this.state.userFormElem.password.value)
				formData.append('confirmPassword', this.state.userFormElem.confirmPassword.value)
				formData.append('imageUrl', this.state.resturantFormElem.file.selectedFile)
				formData.append('location', JSON.stringify(this.props.coords))
				formData.append('catagory', this.state.resturantFormElem.catagory.value)
				formData.append('description', this.state.resturantFormElem.description.value)

				fetch(`${baseUrl}add-resturant`, {
					method: 'POST',
					body: formData
				})
					.then(response => response.json())
					.then(data => {
						if (data.status === 422) {
							this.validateFormHandler()
						}
						this.props.history.push('/')
					})
					.catch(err => {
						console.log('err' + err)
					})
			} else {
				console.log('ssd' + this.state.resturantFormElem.file)
				this.validateFormHandler()
			}
		}
	}

	filePickerBtnHadler = () => {
		this.fileRef.current.click()
	}

	// validateForm = (value, configs) => {
	// 	let message = null
	// 	let isValid = true

	// 	if (configs.required && isValid) {
	// 		if (value && value instanceof String) {
	// 			isValid = value.trim() !== ''
	// 		} else {
	// 			isValid = value ? true : false
	// 		}
	// 		message = !isValid && configs.required.message
	// 	}

	// 	if (configs.imgType && isValid) {
	// 		let fileTypeRegex = /(jpg|jpeg|png)$/i
	// 		isValid = fileTypeRegex.test(value.type.split('/')[1])
	// 		message = !isValid && configs.imgType.message
	// 	}

	// 	if (configs.requiredCoords && isValid) {
	// 		isValid = value.coords !== null ? true : false
	// 		console.log(isValid)
	// 		message = !isValid && configs.requiredCoords.message
	// 	}

	// 	if (configs.minLength && isValid) {
	// 		isValid = value.length >= configs.minLength.value
	// 		message = !isValid && configs.minLength.message
	// 	}

	// 	if (configs.maxLength && isValid) {
	// 		isValid = value.length <= configs.maxLength.value
	// 		message = !isValid && configs.maxLength.message
	// 	}

	// 	if (configs.email && isValid) {
	// 		let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	// 		isValid = emailRegex.test(value)
	// 		message = !isValid && configs.email.message
	// 	}

	// 	if (configs.match && isValid) {
	// 		isValid = value.trim() === configs.match.value.trim()
	// 		message = !isValid && configs.match.message
	// 	}

	// 	return {isValid, message}
	// }

	choosenCoordsHandler = (coords, address) => {
		let data = {coords, address}
		console.log(data)
		this.changeHandler(data, 'coords', 'resturantFormElem')
	}

	changeHandler = (value, identifier, formElem) => {
		let updatedFormElem = {
			...this.state[formElem],
		}
		let updatedElem = {
			...updatedFormElem[identifier],
		}
		if (identifier === 'file') {
			console.log(value)
			updatedElem.selectedFile = value
		} else if (identifier === 'coords') {
			this.props.onSetCoords(value.coords, value.address)
		} else {
			updatedElem.value = value
		}
		if (identifier === 'password') {
			let newConfirmPassword = {
				...updatedFormElem.confirmPassword
			}
			let newValidationConfig = {
				...newConfirmPassword.validationConfig
			}
			let newMatch = {
				...newValidationConfig.match
			}
			newMatch.value = value
			newValidationConfig.match = newMatch
			newConfirmPassword.validationConfig = newValidationConfig
			if (newConfirmPassword.touched === true) {
				let validation = validateForm(this.state.userFormElem.confirmPassword.value, newValidationConfig)
				newConfirmPassword.valid = validation.isValid
				newConfirmPassword.message = validation.message
			}
			updatedFormElem.confirmPassword = newConfirmPassword
		}
		if (identifier === 'confirmPassword') {
			updatedElem.touched = true
		}
		if (identifier === 'file') {
			updatedElem.filename = value ? value.name : ''
		}
		let validation = validateForm(value, updatedElem.validationConfig)
		updatedElem.valid = validation.isValid
		updatedElem.message = validation.message
		updatedFormElem[identifier] = updatedElem

		let userValidity = true
		let formValidity = true
		for (let identifier in updatedFormElem) {
			if (formElem === 'userFormElem') {
				userValidity = updatedFormElem[identifier].valid && userValidity
				this.setState({[formElem]: updatedFormElem, userValidity: userValidity})
			} else {
				formValidity = updatedFormElem[identifier].valid && formValidity
				this.setState({[formElem]: updatedFormElem, formValidity: formValidity})
			}
		}
	}

	showCheckHandler = () => {
		this.setState(prevState => {
			return {showCheck: !prevState.showCheck}
		})
	}

	isResturantHandler = () => {
		this.setState(prevState => {
			return {isResturant: !prevState.isResturant}
		})
	}

	// componentWillUnmount() {
	// 	this.props.onSetCoords(null)
	// }

	render() {
		let isValid = false
		if (!this.state.isResturant) {
			if (this.state.userValidity) {
				isValid = true
			}
		} else {
			if (this.state.userValidity && this.state.formValidity) {
				isValid = true
			}
		}
		const chevron = this.state.showCheck ? 'bi-chevron-up' : 'bi-chevron-down'
		return (
			<div className="container">

				<WrapperCard cardTitle='Sign up' textAlign='center'>
					<form
						className={classes.AuthSignupForm}
						onSubmit={e => e.preventDefault()} noValidate>
						{Object.keys(this.state.userFormElem).map(elem => {
							return (
								<div key={elem}>
									<label>{this.state.userFormElem[elem].label}</label>
									<FormInput
										elem={this.state.userFormElem}
										identifier={elem}
										formElem="userFormElem"
										elemType={this.state.userFormElem[elem].elemType}
										config={this.state.userFormElem[elem].config}
										value={this.state.userFormElem[elem].value}
										changeHandler={this.changeHandler}
									/>
									{
										!this.state.userFormElem[elem].valid &&
										<ErrorMessage>
											{this.state.userFormElem[elem].message}
										</ErrorMessage>
									}
								</div>
							)
						})}
						<div className={classes.isResturant}>
							<div className={classes.isResturantHead}>
								<p>Want to join our resturants?</p>
								<div onClick={this.showCheckHandler}>
									{<Chevron chevron={chevron} />}
								</div>
							</div>
							{this.state.showCheck ? (
								<div className={classes.isResturantCheck}>
									<input
										type='checkbox'
										checked={this.state.isResturant}
										onChange={this.isResturantHandler}
									/>
									<label>Become a resturant</label>
								</div>
							) : null}
							{!this.state.isResturant ? null : (
								<React.Fragment>
									<div className={classes.divFile}>
										<label htmlFor='file-input'>Resturant image</label>
										<FilePicker filePickerBtnHadler={this.filePickerBtnHadler} />
										{this.state.resturantFormElem.file.filename ? <p style={{
											textTransform: 'capitalize',
											color: 'var(--greenColor)',
											marginTop: '0.5rem'
										}}>{this.state.resturantFormElem.file.filename}</p> : null}
										{/* <input style={{display: 'none'}} ref={this.fileRef} id='file-input' name="imageUrl" type='file' onChange={this.filePickerHandler} /> */}
										<FormInput elem={this.state.resturantFormElem}
											identifier='file'
											formElem="resturantFormElem"
											reference={this.fileRef}
											elemType={this.state.resturantFormElem.file.elemType}
											value={this.state.resturantFormElem.file.selectedFile}
											changeHandler={this.changeHandler} />
										{
											!this.state.resturantFormElem.file.valid &&
											<ErrorMessage>
												{this.state.resturantFormElem.file.message}
											</ErrorMessage>
										}
									</div>
									<div>
										<label>Specify your location and delivery zone</label>
										<SearchItem
											choosenCoordsHandler={this.choosenCoordsHandler}
											btnValue={'Serve This Area'}
											btnHandler={this.locateAddress}
											isResturant={this.state.isResturant}
											coords={this.props.coords}
											address={this.props.address} />
										{
											!this.state.resturantFormElem.coords.valid &&
											<ErrorMessage>
												{this.state.resturantFormElem.coords.message}
											</ErrorMessage>
										}
									</div>
									<div>
										<label>{this.state.resturantFormElem.catagory.label}</label>
										<FormInput
											elem={this.state.resturantFormElem}
											identifier='catagory'
											formElem="resturantFormElem"
											elemType={this.state.resturantFormElem.catagory.elemType}
											config={this.state.resturantFormElem.catagory.config}
											value={this.state.resturantFormElem.catagory.value}
											changeHandler={this.changeHandler}
										/>
									</div>
									<div>
										<label>{this.state.resturantFormElem.description.label}</label>
										<FormInput
											elem={this.state.resturantFormElem}
											identifier='description'
											formElem="resturantFormElem"
											elemType={this.state.resturantFormElem.description.elemType}
											value={this.state.resturantFormElem.description.value}
											changeHandler={this.changeHandler}
										/>
										{
											!this.state.resturantFormElem.description.valid &&
											<ErrorMessage>
												{this.state.resturantFormElem.description.message}
											</ErrorMessage>
										}
									</div>
								</React.Fragment>
							)}
							<AuthButton clickHandler={this.clickHandler}
								isValid={true} >
								Sign up
						</AuthButton>
						</div>
					</form>
				</WrapperCard >
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		coords: state.coordsReducer.signupCoords,
		address: state.coordsReducer.signupAddress
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetCoords: (coords, address) => dispatch({type: actionTypes.SET_SIGNUP_COORDS, coords, address})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthSignup))
//this.state.formValidity && this.state.userValidity