import React from 'react'

import Spinner from '../../components/UI/Spinner/Spinner'
import ResturantsItem from '../../components/ResturantsItem/ResturantsItem'
import classes from './Resturants.module.css'

class Resturants extends React.Component {
	state = {
		resturants: null,
		loading: true,
	}
	componentDidMount() {
		const arr = [
			{
				id: 1,
				title: 'Resturant1',
				desc: 'A description',
				rate: '3',
				payment: [1, 2],
			},
			{
				id: 2,
				title: 'Resturant2',
				desc: 'A description',
				rate: '3',
				payment: [1, 2],
			},
			{
				id: 3,
				title: 'Resturant3',
				desc: 'A description',
				rate: '3',
				payment: [1, 2],
			},
			{
				id: 4,
				title: 'Resturant4',
				desc: 'A description',
				rate: '3',
				payment: [1, 2],
			},
		]
		this.setState({ resturants: arr, loading: false })
	}
	render() {
		let resturantsResult = <Spinner />
		if (!this.state.loading) {
			resturantsResult = this.state.resturants.map(elem => (
				<ResturantsItem {...elem} key={elem.id} />
			))
		}
		return <div className={classes.Resturant}> {resturantsResult} </div>
	}
}

export default Resturants
