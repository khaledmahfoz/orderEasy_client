import React from 'react'
import PlusCircle from '../../PlusCircle/PlusCircle'

const accordionItem = props => {
	let { title, desc, price } = props.data
	return (
		<li>
			<div style={{ width: '50%', paddingRight: '1.4rem' }}>
				<h5>{title}</h5>
				<p style={{ margin: '0', fontWeight: 'bold' }}>{desc}</p>
			</div>
			<div style={{ width: '25%' }}>{price}$</div>
			<div style={{ width: '25%', textAlign: 'right' }}>
				<PlusCircle />
			</div>
		</li>
	)
}

export default accordionItem
