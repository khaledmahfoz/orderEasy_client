import React from 'react'

import classes from './PlusCircle.module.css'

const plusCircle = props => {
	{
		return !props.inCart ? (
			<svg
				style={{cursor: 'pointer', color: 'var(--greenColor)'}}
				width='1.6rem'
				height='1.6rem'
				viewBox='0 0 16 16'
				className={`bi bi-plus-circle ${classes.plusCircle}`}
				fill='currentColor'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fillRule='evenodd'
					d='M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z'
				/>
				<path
					fillRule='evenodd'
					d='M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z'
				/>
				<path
					fillRule='evenodd'
					d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'
				/>
			</svg>
		) : (
				<svg
					style={{cursor: 'pointer', color: 'var(--red)'}}
					width='1.6rem'
					height='1.6rem'
					viewBox='0 0 16 16'
					className='bi bi-dash-circle'
					fill='currentColor'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'
					/>
					<path
						fillRule='evenodd'
						d='M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z'
					/>
				</svg>
			)
	}
}

export default plusCircle
