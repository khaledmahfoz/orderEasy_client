import React, { Component } from 'react'

import classes from './AuthSignup.module.css'

import WrapperCard from '../UI/WrapperCard/WrapperCard'
import Chevron from '../UI/Chevron/Chevron'
import FormInput from '../UI/FormInput/FormInput'
import AuthButton from '../UI/AuthButton/AuthButton'

class AuthSignup extends Component {
	state = {
		showCheck: false,
		isResturant: false,
		formElem: {
			fullName: {
				label: 'Full Name',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'text',
				},
			},
			email: {
				label: 'Email',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'email',
				},
			},
			password: {
				label: 'Password',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'password',
				},
			},
			confirmPassword: {
				label: 'Confirm Password',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'password',
				},
			},
		},
		resturantElem: {
			catagory: {
				label: 'Catagory',
				elemType: 'select',
				value: '',
				required: true,
				config: {
					options: [
						{ value: 'italien cusine' },
						{ value: 'french cusine' },
						{ value: 'german cusine' },
					],
				},
			},
			description: {
				label: 'Enter a brief description',
				elemType: 'textarea',
				value: '',
				required: true,
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
	changeResturantHandler = (value, identifier) => {
		let updatedFormElem = {
			...this.state.resturantElem,
		}
		let updatedElem = {
			...updatedFormElem[identifier],
		}
		console.log(updatedElem)
		updatedElem.value = value
		updatedFormElem[identifier] = updatedElem
		this.setState({ resturantElem: updatedFormElem })
	}
	showCheckHandler = () => {
		this.setState(prevState => {
			return { showCheck: !prevState.showCheck }
		})
	}
	isResturantHandler = () => {
		this.setState(prevState => {
			return { isResturant: !prevState.isResturant }
		})
	}
	render() {
		const chevron = this.state.showCheck ? 'bi-chevron-up' : 'bi-chevron-down'
		console.log(this.state.isResturant)
		return (
			<WrapperCard cardTitle='Sign up' textAlign='center'>
				<form
					className={classes.AuthSignupForm}
					onSubmit={e => e.preventDefault()}>
					{Object.keys(this.state.formElem).map(elem => {
						return (
							<div key={elem}>
								<label>{this.state.formElem[elem].label}</label>
								<FormInput
									elem={this.state.formElem}
									identifier={elem}
									elemType={this.state.formElem[elem].elemType}
									config={this.state.formElem[elem].config}
									value={this.state.formElem[elem].value}
									changeHandler={this.changeHandler}
								/>
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
									className=''
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
									<div className={classes.imgFileLabel}>Resturant image</div>
									<label htmlFor='file-input'>
										<svg
											viewBox='0 0 16 16'
											className='bi bi-plus'
											fill='currentColor'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												fillRule='evenodd'
												d='M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z'
											/>
											<path
												fillRule='evenodd'
												d='M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z'
											/>
										</svg>
									</label>
									<input id='file-input' type='file' />
								</div>
								<div>
									<label>{this.state.resturantElem.catagory.label}</label>
									<FormInput
										elem={this.state.resturantElem}
										identifier='catagory'
										elemType={this.state.resturantElem.catagory.elemType}
										config={this.state.resturantElem.catagory.config}
										value={this.state.resturantElem.catagory.value}
									/>
								</div>
								<div>
									<label>{this.state.resturantElem.description.label}</label>
									<FormInput
										elem={this.state.resturantElem}
										identifier='description'
										elemType={this.state.resturantElem.description.elemType}
										value={this.state.resturantElem.description.value}
										changeHandler={this.changeResturantHandler}
										// config={this.state.resturantElem.description.config}
									/>
								</div>
							</React.Fragment>
						)}
						<AuthButton>Sign up</AuthButton>
					</div>
				</form>
			</WrapperCard>
		)
	}
}

export default AuthSignup
{
	/* <div>Click the upload icon below to upload a file.</div>

<div class="image-upload">
    <label for="file-input">
        <img src="https://goo.gl/pB9rpQ"/>
    </label>

    <input id="file-input" type="file"/>
</div>
.image-upload > input
{
    display: none;
}

.image-upload img
{
    width: 80px;
    cursor: pointer;
} */
}
