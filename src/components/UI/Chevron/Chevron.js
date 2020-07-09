import React from 'react'

const chevron = props => (
	<svg
		style={{cursor: 'pointer'}}
		width='1.2rem'
		height='1.2rem'
		viewBox='0 0 16 16'
		className={`bi ${props.chevron}`}
		fill='currentColor'
		xmlns='http://www.w3.org/2000/svg'>
		{props.chevron === 'bi-chevron-down' ? (
			<path
				fillRule='evenodd'
				d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
			/>
		) : (
				<path
					fillRule='evenodd'
					d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
				/>
			)}
	</svg>
)

export default chevron
