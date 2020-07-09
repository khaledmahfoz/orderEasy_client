import React, { Component } from 'react'
import PlusCircle from '../../PlusCircle/PlusCircle'

class AccordionItem extends Component {
	state = {
		inCart: false,
	}
	addToCart = target => {
		this.setState({ inCart: true })
		this.props.onAdd(target)
	}
	removeFromCart = target => {
		this.setState({ inCart: false })
		this.props.onRemove(target)
	}
	render() {
		let { title, desc, price } = this.props.data
		return (
			<li>
				<div style={{ width: '50%', paddingRight: '1.4rem' }}>
					<h5>{title}</h5>
					<p style={{ margin: '0', fontWeight: 'bold' }}>{desc}</p>
				</div>
				<div style={{ width: '25%' }}>{price}$</div>
				<div style={{ width: '25%', textAlign: 'right' }}>
					<PlusCircle
						inCart={this.state.inCart}
						target={this.props.data}
						addToCart={this.addToCart}
						removeFromCart={this.removeFromCart}
					/>
				</div>
			</li>
		)
	}
}

export default AccordionItem
