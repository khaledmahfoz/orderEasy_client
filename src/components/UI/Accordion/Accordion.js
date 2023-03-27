import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './Accordion.module.css'

import * as actionTypes from '../../../store/actions/actionTypes'
import AccordionItem from './AccordionItem/AccordionItem'
import FormInput from '../FormInput/FormInput'
import MenuForm from '../../../containers/MenuForm/MenuForm'
import Plus from '../Plus/Plus'
import Minus from '../Minus/Minus'
import MainEdit from '../MainEdit/MainEdit'
import Trash from '../Trash/Trash'
import Placeholder from '../../UI/Placeholder/Placeholder'
import {SmallLoading} from '../../UI/SmallLoading/SmallLoading'
import {validateForm} from '../../../util/validationSchema'
import {baseUrlAdmin} from '../../../util/baseUrl'
import PlusCircle from '../PlusCircle/PlusCircle'

class Accordion extends Component {
	state = {
		show: true,
		editBool: false,
		editLoading: false,
		addItem: false,
		addItemLoading: false,
		formElem: {
			category: {
				elemType: 'input',
				value: this.props.tag,
				label: 'Enter category name',
				config: {
					type: 'text',
					placeholder: 'Enter category name',
				},
				valid: false,
				message: null,
				validationConfig: {
					required: {
						value: true,
						message: 'Enter category name'
					},
					minLength: {
						value: 5,
						message: 'Category name should be atleast 5 characters'
					},
					maxLength: {
						value: 15,
						message: 'Category name shouldn\'t exceed 15 characters'
					}
				}
			},
		},
		formValidity: false
	}

	toggleEditTagHandler = () => {
		this.clearFields()
		this.setState(prevState => {
			return {
				editBool: !prevState.editBool,
			}
		})
	}

	toggleShow = () => {
		this.setState(prevState => {
			return {show: !prevState.show}
		})
	}

	toggleAddForm = () => {
		this.setState(prevState => {
			return {addItem: !prevState.addItem}
		})
	}

	toggleAddItemHandler = () => {
		this.setState(prevState => {
			return {addItemLoading: !prevState.addItemLoading}
		})
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
		let formValidity = updatedFormElem[identifier].valid
		this.setState({formElem: updatedFormElem, formValidity: formValidity})
	}

	clearFields = () => {
		let updatedFormElem = {
			...this.state.formElem
		}
		let updatedElem = {
			...updatedFormElem.category
		}
		updatedElem.value = this.props.tag
		updatedElem.message = null
		updatedElem.valid = false
		updatedFormElem.category = updatedElem
		this.setState({formElem: updatedFormElem})
	}

	deleteMenu = () => {
		this.props.onSetErrorOff()
		this.setState({editLoading: true, editBool: false})
		let data = {
			menuId: this.props.menuId,
			userId: this.props.resturantId
		}
		fetch(baseUrlAdmin + '/delete-menu', {
			method: 'DELETE',
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
				this.setState({editLoading: false})
				this.props.updatedFinishedHandler(res)
			})
			.catch(err => {
				this.setState({editLoading: false})
				this.props.onSetErrorOn(err.message)
			})
	}

	updateTagHandler = () => {
		if (this.state.formValidity) {
			this.props.onSetErrorOff()
			this.setState({editLoading: true, editBool: false})
			let data = {
				catageory: this.state.formElem.category.value,
				menuId: this.props.menuId,
				userId: this.props.resturantId
			}
			fetch(baseUrlAdmin + '/edit-menuTag', {
				method: 'POST',
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
					this.setState({editLoading: false})
					this.props.updatedFinishedHandler(res)
				})
				.catch(err => {
					this.setState({editLoading: false})
					this.props.onSetErrorOn(err.message)
				})
		}
	}

	render() {
		let indecatorControls
		let buttonControls
		if (this.props.edit) {
			if (this.state.editLoading) {
				indecatorControls = (
					<span>
						<SmallLoading color="var(--whiteColor)" />
					</span>
				)
			} else {
				indecatorControls = (
					<React.Fragment>
						<span className={classes.AddNewMealBtn} onClick={this.toggleAddForm}><PlusCircle /></span>
						<span style={{marginRight: '1rem'}} className="pointer" onClick={this.toggleEditTagHandler}>
							<MainEdit />
						</span>
						<div className="pointer" onClick={this.deleteMenu}><Trash /></div>
					</React.Fragment>
				)
			}
		}
		if (this.state.editBool) {
			buttonControls = (
				<div>
					<span className="pointer" onClick={this.updateTagHandler}>
						Edit
					</span>
					<span className="pointer" onClick={this.toggleEditTagHandler}>
						Cancel
					</span>
				</div>
			)
		}


		return (
			<div className={classes.Accordion}>
				<div className={classes.AccordionTag}>
					<div className={classes.TagEdit}>
						{
							this.state.editBool
								? (
									<div className={classes.editTagInput}>
										<FormInput
											identifier="category"
											elemType={this.state.formElem.category.elemType}
											config={this.state.formElem.category.config}
											value={this.state.formElem.category.value}
											changeHandler={this.changeHandler}
										/>
										{this.state.formElem.category.message
											&& <p>{this.state.formElem.category.message}</p>
										}
									</div>
								)
								: (
									<div className="d-flex align-items-center">
										<span>
											{this.props.tag}
										</span>
										{indecatorControls}
									</div>
								)
						}
						{buttonControls}
					</div>

					<div className="pointer" onClick={this.toggleShow}>
						{
							this.state.show
								? <Minus size="2.2rem" />
								: <Plus size="2.2rem" />
						}
					</div>
				</div>
				{
					this.state.show ? (
						<ul className={classes.AccordionList}>
							{
								this.state.addItem
								&& (
									<MenuForm
										single={true}
										formElem={this.props.formElem}
										formValidity={this.props.formValidity}
										menuId={this.props.menuId}
										token={this.props.token}
										closeEditHandler={this.toggleAddForm}
										menuLoadingHandler={this.toggleAddItemHandler}
										updatedFinishedHandler={this.props.updatedFinishedHandler}
									/>
								)
							}
							{
								this.state.addItemLoading
								&& <Placeholder />
							}

							{
								this.props.value.length > 0
									?
									this.props.value.map(data => {
										return (
											<AccordionItem
												key={data._id}
												token={this.props.token}
												itemLoading={this.state.itemLoading}
												data={{...data, itemId: data._id, resturantId: this.props.resturantId}}
												onToggleItem={this.props.onToggleItem}
												cart={this.props.cart}
												isResturant={this.props.isResturant}
												edit={this.props.edit}
												updatedFinishedHandler={this.props.updatedFinishedHandler}
												removeMenuItemHandler={this.removeMenuItemHandler}
												menuId={this.props.menuId}
												Authenticated={this.props.Authenticated}
											/>
										)
									})
									:
									<p style={{padding: '2rem 0', textAlign: 'center', color: '#555'}}>coming soon</p>
							}
						</ul>
					) : null
				}
			</div >
		)
	}
}

const mapStateToProps = state => {
	return {
		formElem: state.menuFormItemReducer.formElem,
		formValidity: state.menuFormItemReducer.formValidity,
		Authenticated: state.authReducer.token !== null,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
		onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Accordion)

