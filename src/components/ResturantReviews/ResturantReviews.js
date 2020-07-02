import React, { Component } from 'react'

import SectionSpinner from '../UI/SectionSpinner/SectionSpinner'
import WrapperCard from '../UI/WrapperCard/WrapperCard'
import ReviewItem from '../ReviewItem/ReviewItem'

const testReviews = [
	{
		id: 1,
		name: 'user',
		rate: 3,
		time: '22/2/2020',
		content: 'this is nice resturant',
	},
	{
		id: 2,
		name: 'user2',
		rate: 3,
		time: '22/2/2020',
		content: 'this is nice resturant',
	},
	{
		id: 3,
		name: 'user3',
		rate: 3,
		time: '22/2/2020',
		content: 'this is nice resturant',
	},
	{
		id: 4,
		name: 'user4',
		rate: 3,
		time: '22/2/2020',
		content: 'this is nice resturant',
	},
]

class ResturantReviews extends Component {
	state = {
		reviews: null,
		loading: true,
	}
	componentDidMount() {
		this.setState({ reviews: testReviews, loading: false })
	}
	render() {
		let reviewsResult = !this.state.loading ? (
			this.state.reviews.map(elem => {
				const { name, rate, time, content } = elem
				return (
					<ReviewItem
						key={elem.id}
						name={name}
						rate={rate}
						time={time}
						content={content}
					/>
				)
			})
		) : (
			<SectionSpinner />
		)
		return (
			<WrapperCard cardTitle='Reviews of this resturant'>
				{reviewsResult}
			</WrapperCard>
		)
	}
}

export default ResturantReviews
