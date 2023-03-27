import React from 'react'
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions/actionTypes'
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
		this.props.onSetErrorOff()
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
					if (res.status !== 200) {
						throw new Error('something went wrong')
					}
					return res.json()
				})
				.then(resturants => {
					this.setState({resturants: resturants, loading: false})
				})
				.catch(err => {
					this.setState({loading: false})
					this.props.onSetErrorOn(err.message)
				})
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

const mapDispatchToProps = dispatch => {
	return {
		onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
		onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Resturants)
