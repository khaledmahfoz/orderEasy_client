import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './Menu.module.css'

import WrapperCard from '../UI/WrapperCard/WrapperCard'
import SectionSpinner from '../UI/SectionSpinner/SectionSpinner'
import Accordion from '../UI/Accordion/Accordion'
import * as actionTypes from '../../store/actions/actionTypes'
import MenuForm from '../../containers/MenuForm/MenuForm'
import Placeholder from '../UI/Placeholder/Placeholder'
import {toggleItemAsync} from '../../store/actions/cartCreators'

class Menu extends Component {
	state = {
		editMenu: false,
		edit: false
		// updated: false
	}

	toggleEditHandler = () => {
		this.setState(prevState => {
			return {
				edit: !prevState.edit
			}
		})
	}

	openEditMenuHandler = () => {
		this.setState({editMenu: true})
	}

	closeEditMenuHandler = () => {
		this.setState({editMenu: false})
	}

	render() {
		let menuContent = (
			<div>
				<h3 style={{
					textAlign: 'center',
					padding: '2rem 0'
				}}>No Menu</h3>
			</div>
		)
		if (this.props.menu.length) {
			menuContent = this.props.menu.reverse().map(elem => {
				return (
					<div key={elem._id}>
						<Accordion
							tag={elem.catageory}
							value={elem.meals}
							resturantId={this.props.resturantId}
							onToggleItem={this.props.onToggleItem}
							cart={this.props.cart}
							isResturant={this.props.isResturant}
							edit={this.state.edit}
							token={this.props.token}
							resturantId={this.props.resturantId}
							menuId={elem._id}
							updatedFinishedHandler={this.props.updatedFinishedHandler}
						/>
					</div>
				)
			})
		}
		return (
			<WrapperCard cardTitle="Resturant's Menu">
				{
					this.props.isResturant
						? (

							<div>
								{
									<div className={classes.ControllBanel}>
										{!this.state.editMenu
											&& (
												<button className={classes.AddBtn} onClick={this.openEditMenuHandler}>
													Add New
												</button>
											)
										}

										{
											this.props.menu.length ? (
												<button className={classes.EditBtn} onClick={this.toggleEditHandler}>
													{this.state.edit ? 'cancel' : 'Edit Menu'}
												</button>
											)
												: null
										}
									</div>
								}

								{
									this.state.editMenu
									&& (
										<MenuForm
											formElem={this.props.formElem}
											formValidity={this.props.formValidity}
											updatedFinishedHandler={this.props.updatedFinishedHandler}
											menuLoadingHandler={this.props.menuLoadingHandler}
											closeEditHandler={this.closeEditMenuHandler}
											token={this.props.token}
										/>
									)
								}
								{
									this.props.menuLoading
									&& <Placeholder />
								}
								{menuContent}
							</div>
						) : (
							<div>
								{menuContent}
							</div>
						)
				}
			</WrapperCard>
		)
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cartReducer.cart,
		token: state.authReducer.token,
		isResturant: state.authReducer.isResturant, //don't delete it used in menuform
		formElem: state.menuFormReducer.formElem,
		formValidity: state.menuFormReducer.formValidity
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onToggleItem: (item, Authenticated, token, startLoading, stopLoading) => dispatch(toggleItemAsync(item, Authenticated, token, startLoading, stopLoading))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
