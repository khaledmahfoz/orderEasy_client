import React, { Component } from 'react'
import { connect } from 'react-redux'

import WrapperCard from '../UI/WrapperCard/WrapperCard'
import SectionSpinner from '../UI/SectionSpinner/SectionSpinner'
import Accordion from '../UI/Accordion/Accordion'
import * as actionTypes from '../../store/actions/actionTypes'

const testMenu = {
	Salads: [
		{
			id: 1,
			title: 'First salad',
			price: 2,
			desc:
				'It is a long established fact that a reader will be distracted by the readable content.',
		},
		{
			id: 2,
			title: 'Last salad',
			price: 3,
			desc: 'what a salad',
		},
	],
	Burgers: [
		{
			id: 3,
			title: 'Meat burger',
			price: 6,
			desc: 'very taste burger',
		},
		{
			id: 4,
			title: 'Cheese burger',
			price: 5,
			desc: 'good old burger',
		},
	],
}

class Menu extends Component {
	state = {
		menu: null,
		loading: true,
	}
	componentDidMount() {
		this.setState({ menu: testMenu, loading: false })
	}
	componentDidUpdate() {}
	render() {
		return (
			<WrapperCard cardTitle="Resturant's Menu">
				{this.state.loading ? (
					<SectionSpinner />
				) : (
					<div>
						{Object.entries(this.state.menu).map(([key, value]) => {
							return (
								<Accordion
									key={key}
									tag={key}
									value={value}
									onAdd={this.props.onAdd}
									onRemove={this.props.onRemove}></Accordion>
							)
						})}
					</div>
				)}
			</WrapperCard>
		)
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cartReducer.cart,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetMenu: menu => dispatch({ type: actionTypes.SET_MENU }),
		onAdd: target => dispatch({ type: actionTypes.ADD_ITEM, target: target }),
		onRemove: target => dispatch({ type: actionTypes.REMOVE, target: target }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
