import React from 'react'
import {connect} from 'react-redux'

import {baseUrl} from '../../util/baseUrl'
import Spinner from '../../components/UI/Spinner/Spinner'
import ResturantsItem from '../../components/ResturantsItem/ResturantsItem'
import classes from './Resturants.module.css'

class Resturants extends React.Component {
	state = {
		resturants: null,
		loading: true,
	}
	componentDidMount() {
		if (this.props.choosenCoords) {
			let coords = this.props.choosenCoords
			fetch(baseUrl + 'resturants', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					coords: coords
				})
			})
				.then(res => {
					// if (res.status !== 200) {
					// 	console.log(res)
					// 	throw new Error('sda')
					// }
					return res.json()
				})
				.then(resturants => {
					console.log(resturants)
					this.setState({resturants: resturants, loading: false})
				})
				.catch(err => console.log(err))
		} else {
			this.props.history.replace('all-resturants')
		}
	}
	render() {
		let resturantsResult = <Spinner />
		if (this.state.resturants) {
			resturantsResult = this.state.resturants.map(elem => (
				<ResturantsItem {...elem} key={elem._id} />
			))
		}
		return <div className={this.state.resturants ? 'container' : classes.Resturant}> {resturantsResult} </div>
	}
}

const mapStateToProps = state => {
	return {
		choosenCoords: state.coordsReducer.homeCoords
	}
}


export default connect(mapStateToProps)(Resturants)
