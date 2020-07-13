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
		fetch('http://localhost:8080/all-resturants', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(resturants => {
				console.log(resturants)
				this.setState({resturants: resturants, loading: false})
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		let resturantsResult = <Spinner />
		if (!this.state.loading) {
			resturantsResult = this.state.resturants.map(elem => (
				<ResturantsItem {...elem} key={elem._id} />
			))
		}
		return <div className={classes.Resturant}> {resturantsResult} </div>
	}
}

export default Resturants
