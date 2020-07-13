import React from 'react'

import classes from './FormInput.module.css'

const formInput = props => {
	let inputElem
	switch (props.elemType) {
		case 'input':
			inputElem = (
				<input
					className={`form-control ${classes.Input}`}
					type='input'
					{...props.config}
					value={props.value}
					onChange={event =>
						props.changeHandler(event.target.value, props.identifier)
					}
				/>
			)
			break
		case 'textarea':
			inputElem = (
				<textarea
					className={`form-control ${classes.Textarea}`}
					value={props.value}
					onChange={event =>
						props.changeHandler(event.target.value, props.identifier)
					}
				/>
			)
			break
		case 'select':
			inputElem = (
				<select className={`custom-select ${classes.select}`} onChange={e => props.changeCatagory(e.target.value)}>
					{props.config.options.map(elem => (
						<option key={elem.value}>{elem.value}</option>
					))}
				</select>
			)
			break
		default:
			inputElem = (
				<input
					className={classes.Input}
					type='input'
					{...props.config}
					value={props.value}
					onChange={event =>
						props.changeHandler(event.target.value, props.identifier)
					}
				/>
			)
			break
	}
	return inputElem
}

export default formInput
