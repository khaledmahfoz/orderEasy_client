import React, {Component} from 'react'

import classes from './AuthSignup.module.css'

import WrapperCard from '../UI/WrapperCard/WrapperCard'
import Chevron from '../UI/Chevron/Chevron'
import FormInput from '../UI/FormInput/FormInput'
import AuthButton from '../UI/AuthButton/AuthButton'
import SearchItem from '../SearchBox/SearchItem/SearchItem'
import FilePicker from '../UI/FilePicker/FilePicker'

class AuthSignup extends Component {
	constructor(props) {
		super(props)
		this.fileRef = React.createRef()
	}
	state = {
		showCheck: false,
		isResturant: false,
		formElem: {
			fullName: {
				name: 'title',
				label: 'Full Name',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'text',
				},
			},
			email: {
				name: 'email',
				label: 'Email',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'email',
				},
			},
			password: {
				name: 'password',
				label: 'Password',
				elemType: 'input',
				value: '',
				required: true,
				config: {
					type: 'password',
				},
			},
			confirmPassword: {
				name: 'confirmPassword',
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
				name: 'catagory',
				label: 'Catagory',
				elemType: 'select',
				value: '',
				required: true,
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
				required: true,
			},
			selectedFile: null,
			filename: ''
		},
	}
	clickHandler = () => {
		if (!this.state.isResturant) {
			//some code
		} else {
			const formData = new FormData()
			formData.append('title', this.state.formElem.fullName.value)
			formData.append('email', this.state.formElem.email.value)
			formData.append('password', this.state.formElem.password.value)
			formData.append('description', this.state.resturantElem.description.value)
			formData.append('imageUrl', this.state.resturantElem.selectedFile)
			console.log(this.state.resturantElem.selectedFile)
			fetch('http://localhost:8080/admin/add-resturant', {
				method: 'POST',
				body: formData
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	filePickerBtnHadler = () => {
		this.fileRef.current.click()
	}

	filePickerHandler = (event) => {
		console.log(event.target.files[0])
		let updatedFormElem = {
			...this.state.resturantElem
		}
		updatedFormElem.selectedFile = event.target.files[0]
		this.setState({resturantElem: updatedFormElem})
		event.target.files[0] ? this.setState({filename: event.target.files[0].name}) : this.setState({filename: null})
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
		this.setState({formElem: updatedFormElem})
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
		this.setState({resturantElem: updatedFormElem})
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
									<label htmlFor='file-input'>Resturant image</label>
									<FilePicker filePickerBtnHadler={this.filePickerBtnHadler} />
									{this.state.filename ? <p style={{
										textTransform: 'capitalize',
										color: 'var(--greenColor)',
										marginTop: '0.5rem'
									}}>{this.state.filename}</p> : null}
									<input style={{display: 'none'}} ref={this.fileRef} id='file-input' name="imageUrl" type='file' onChange={this.filePickerHandler} />
								</div>
								<div>
									<label>Specify your location and delivery zone</label>
									<SearchItem isResturant={this.state.isResturant} />
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
						<AuthButton clickHandler={this.clickHandler}>Sign up</AuthButton>
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
