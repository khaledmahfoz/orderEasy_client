import React from 'react'

import classes from './FormInput.module.css'

const formInput = props => {
	let inputElem
	switch (props.elemType) {
		case 'input':
			inputElem = (
				<input
					className={'form-control ' + classes.Input}
					type='input'
					{...props.config}
					value={props.value}
					onChange={event =>
						props.changeHandler(event.target.value, props.identifier, props.formElem)
					}
				/>
			)
			break
		case 'file':
			inputElem = (
				<input
					name="imageUrl"
					style={{display: 'none'}}
					type='file'
					filename={props.value}
					ref={props.reference}
					onChange={event =>
						props.changeHandler(event.target.files[0] ? event.target.files[0] : null, props.identifier, props.formElem)
					}
				/>
			)
			break
		case 'textarea':
			inputElem = (
				<textarea
					className={`form-control ${classes.Textarea}`}
					value={props.value}
					{...props.config}
					onChange={event =>
						props.changeHandler(event.target.value, props.identifier, props.formElem)
					}
				/>
			)
			break
		case 'select':
			inputElem = (
				<select className={`custom-select ${classes.select}`} onChange={event =>
					props.changeHandler(event.target.value, props.identifier, props.formElem)}>
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
						props.changeHandler(event.target.value, props.identifier, props.formElem)
					}
				/>
			)
			break
	}
	return inputElem
}

export default formInput
