import React, { Component } from 'react'

import classes from './Accordion.module.css'

import AccordionItem from './AccordionItem/AccordionItem'
import Plus from '../Plus/Plus'

class Accordion extends Component {
	state = {
		show: true,
	}
	clickHandler = () => {
		this.setState(prevState => {
			return { show: !prevState.show }
		})
	}
	render() {
		return (
			<div className={classes.Accordion}>
				<div className={classes.AccordionTag} onClick={this.clickHandler}>
					<div>{this.props.tag}</div>
					<div>
						<Plus />
					</div>
				</div>
				{this.state.show ? (
					<ul className={classes.AccordionList}>
						{this.props.value.map(data => {
							return (
								<AccordionItem
									key={data.title}
									data={data}
									onAdd={this.props.onAdd}
									onRemove={this.props.onRemove}
								/>
							)
						})}
					</ul>
				) : null}
			</div>
		)
	}
}

export default Accordion
