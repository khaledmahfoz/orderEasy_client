import React, {Component} from 'react'

import SectionSpinner from '../UI/SectionSpinner/SectionSpinner'
import WrapperCard from '../UI/WrapperCard/WrapperCard'
import ReviewItem from '../ReviewItem/ReviewItem'

class ResturantReviews extends Component {
	render() {
		let reviewsResult = this.props.reviews.length ? (
			this.props.reviews.map(elem => {
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
