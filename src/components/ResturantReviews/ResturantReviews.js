import React, {Component} from 'react'

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
	render() {
		console.log(this.props.reviews)
		let reviewsResult = this.props.reviews.length ? (
			this.props.reviews.map(elem => {
				console.log(elem)
				const {userId, rate, createdAt, updatedAt, content} = elem
				return (
					<ReviewItem
						key={elem._id}
						name={userId.title}
						rate={rate}
						time={createdAt}
						updated={updatedAt}
						content={content}
					/>
				)
			})
		) : (
				<p>no reviews yet</p>
			)
		return (
			<WrapperCard cardTitle='Reviews of this resturant'>
				{reviewsResult}
			</WrapperCard>
		)
	}
}

export default ResturantReviews
