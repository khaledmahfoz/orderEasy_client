import React, { Component } from 'react'

import WrapperCard from '../UI/WrapperCard/WrapperCard'
import SectionSpinner from '../UI/SectionSpinner/SectionSpinner'
import Accordion from '../UI/Accordion/Accordion'

const testMenu = {
	Salads: [
		{
			title: 'First salad',
			price: 2,
			desc:
				'It is a long established fact that a reader will be distracted by the readable content.',
		},
		{
			title: 'Last salad',
			price: 3,
			desc: 'what a salad',
		},
	],
	Burgers: [
		{
			title: 'Meat burger',
			price: 6,
			desc: 'very taste burger',
		},
		{
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
	render() {
		return (
			<WrapperCard cardTitle="Resturant's Menu">
				{this.state.loading ? (
					<SectionSpinner />
				) : (
					<div>
						{Object.entries(this.state.menu).map(([key, value]) => {
							return <Accordion key={key} tag={key} value={value}></Accordion>
						})}
					</div>
				)}
			</WrapperCard>
		)
	}
}

export default Menu
