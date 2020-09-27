import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './AccordionItem.module.css'

import * as actionTypes from '../../../../store/actions/actionTypes'
import FormInput from '../../FormInput/FormInput'
import ErrorMessage from '../../../UI/ErrorMessage/ErrorMessage'
import PlusCircle from '../../PlusCircle/PlusCircle'
import Edit from '../../Edit/Edit'
import Trash from '../../Trash/Trash'
import {SmallLoading} from '../../../UI/SmallLoading/SmallLoading'
import {baseUrlAdmin} from '../../../../util/baseUrl'
import {validateForm} from '../../../../util/validationSchema'

class AccordionItem extends Component {
	state = {
		cart: this.props.cart,
		inCart: this.props.cart.find(elem => elem.itemId === this.props.data.itemId) ? true : false,
		itemLoading: false,
		itemEdit: false,
		itemEditLoading: false,
		loading: false,
		formElem: {
			meal: {
				elemType: 'input',
				value: this.props.data.meal,
				label: 'Enter meal title',
				config: {
					type: 'text',
					placeholder: 'Enter meal title',
				},
				valid: true,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Enter meal title'
					},
					minLength: {
						value: 5,
						message: 'Meal title should be atleast 5 characters'
					},
					maxLength: {
						value: 15,
						message: 'Meal title shouldn\'t exceed 15 characters'
					}
				}
			},
			price: {
				elemType: 'input',
				value: this.props.data.price,
				label: 'Enter meal price',
				config: {
					type: 'text',
					placeholder: 'Enter a price',
				},
				valid: true,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Enter a price'
					}
				}
			},
			description: {
				elemType: 'textarea',
				value: this.props.data.description,
				valid: true,
				label: 'Enter meal description',
				message: null,
				config: {
					type: 'textarea',
					placeholder: 'Enter meal description',
				},
				validationConfig: {
					required: {
						value: true,
						message: 'Please provide a brief description'
					},
					minLength: {
						value: 5,
						message: 'Description should be atleast 5 characters'
					},
					maxLength: {
						value: 30,
						message: 'Description shouldn\'t exceed 30 characters'
					}
				}
			},
		},
		formValidity: false
	}


	startLoading = () => {
		this.setState({loading: true})
	}

	stopLoading = () => {
		this.setState({loading: false})
	}

	toggleItemEdit = () => {
		this.clearFields()
		this.setState(prevState => {
			return {
				itemEdit: !prevState.itemEdit
			}
		})
	}

	updateItemHandler = () => {
		this.props.onSetErrorOff()
		this.setState({itemEditLoading: true})
		if (this.state.formValidity) {
			let data = {
				menuId: this.props.menuId,
				itemId: this.props.data.itemId,
				meal: this.state.formElem.meal.value,
				description: this.state.formElem.description.value,
				price: this.state.formElem.price.value
			}
			fetch(baseUrlAdmin + 'edit-menuItem', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					if (res.status !== 200) {
						throw new Error('something went wrong')
					}
					return res.json()
				})
				.then(res => {
					this.toggleItemEdit()
					this.props.updatedFinishedHandler(res)
					this.setState({itemEditLoading: false})
				})
				.catch(err => {
					this.setState({itemEditLoading: false})
					this.props.onSetErrorOn(err.message)
				})
		}
	}

	removeMenuItemHandler = (itemId) => {
		this.props.onSetErrorOff()
		this.setState({itemLoading: true})
		let data = {
			menuId: this.props.menuId,
			itemId
		}
		fetch(baseUrlAdmin + '/remove-menuItem', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.props.token
			},
			body: JSON.stringify(data)
		})
			.then(res => {
				if (res.status !== 200) {
					let err
					err = new Error('something went wrong')
					throw err
				}
				return res.json()
			})
			.then(res => {
				this.setState({itemLoading: false})
				this.props.updatedFinishedHandler(res)
			})
			.catch(err => {
				this.setState({itemEditLoading: false})
				this.onSetErrorOn(err.msg)
			})
	}


	componentDidUpdate(prevProps, prevState) {
		if (prevState.cart !== this.props.cart) {
			let check = this.props.cart.find(elem => elem.itemId === this.props.data.itemId) ? true : false
			this.setState({cart: this.props.cart, inCart: check})
		}
	}

	changeHandler = (value, identifier) => {
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

	clearFields = () => {
		let updatedFormElem = {
			...this.state.formElem,
		}
		for (let identifier in updatedFormElem) {
			let updatedElem = {
				...updatedFormElem[identifier],
			}
			updatedElem.value = this.props.data[identifier]
			updatedElem.message = null
			updatedElem.valid = true
			updatedFormElem[identifier] = updatedElem
		}
		this.setState({formElem: updatedFormElem, formValidity: false})
	}

	toggleItem = (target) => {
		let {Authenticated, token} = this.props
		this.props.onToggleItem(target, Authenticated, token, this.startLoading, this.stopLoading)
		let check = this.state.cart.find(elem => elem.itemId === target._id) ? true : false
		this.setState({inCart: check})
	}

	render() {
		let controllBtn = null
		if (!this.props.isResturant) {
			controllBtn = (
				<div className="d-flex justify-content-end">
					{
						this.state.loading
							? (
								<SmallLoading color="var(--primeColor)" />
							)
							: (
								<span onClick={() => this.toggleItem({...this.props.data, menuId: this.props.menuId})}>
									<PlusCircle inCart={this.state.inCart} />
								</span>
							)
					}
				</div>
			)
		} else if (this.props.isResturant && this.props.edit) {
			controllBtn = (
				<div className={classes.controllBtn}>
					<React.Fragment>
						<span onClick={this.toggleItemEdit}><Edit /></span>
						{
							!this.state.itemLoading
								? (
									<span onClick={() => this.removeMenuItemHandler(this.props.data._id)}>
										<Trash />
									</span>
								)
								: (
									<span>
										<SmallLoading color="var(--primeColor)" />
									</span>
								)
						}
					</React.Fragment>

				</div>
			)
		}
		let {meal, description, price} = this.props.data
		return (
			<li>
				{
					this.state.itemEdit
						? (
							<form className="w-100" onSubmit={e => e.preventDefault()}>
								{
									Object.keys(this.state.formElem).map(elem => {
										return (
											<div style={{marginBottom: '1rem'}} key={this.state.formElem[elem].label}>
												<label>{this.state.formElem[elem].label}</label>
												<FormInput
													identifier={elem}
													elemType={this.state.formElem[elem].elemType}
													config={this.state.formElem[elem].config}
													value={this.state.formElem[elem].value}
													changeHandler={this.changeHandler}
												/>
												<ErrorMessage>
													{this.state.formElem[elem].message}
												</ErrorMessage>
											</div>
										)
									})
								}
								<div className={classes.BtnsWrapper}>
									<button
										style={{opacity: this.state.itemEditLoading ? '0.75' : '1'}}
										onClick={this.updateItemHandler}
										disabled={!this.state.formValidity}
									>
										{!this.state.itemEditLoading
											? 'submit'
											: <span className={classes.controllBtn}><SmallLoading color="var(--whiteColor)" /></span>
										}
									</button>
									<button
										style={{opacity: this.state.itemEditLoading ? '0.75' : '1'}}
										disabled={this.state.itemEditLoading}
										className="mr-4" onClick={this.toggleItemEdit}>
										cancel
									</button>
								</div>
							</form>
						)
						: (
							<React.Fragment>
								<div style={{width: 'calc(100% / 3)', paddingRight: '1.4rem'}}>
									<h5>{meal}</h5>
									<p style={{margin: '0', fontWeight: 'bold'}}>{description}</p>
								</div>
								<div style={{width: 'calc(100% / 3)', textAlign: 'center'}}>{price}$</div>
								{controllBtn}
							</React.Fragment>
						)
				}
			</li>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
		onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
	}
}


export default connect(null, mapDispatchToProps)(AccordionItem)
