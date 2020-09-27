import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Hero from '../../components/Hero/Hero'
import SearchBox from '../../components/SearchBox/SearchBox'
import OrderTutorial from '../../components/OrderTutorial/OrderTutorial'
import * as actionTypes from '../../store/actions/actionTypes'
import classes from './HomeSearch.module.css'

class homeSearch extends React.Component {
	findBtnHandler = () => {
		this.props.history.push('/resturants')
	}

	choosenCoordsHandler = (coords, address) => {
		this.props.onSetCoords(coords, address)
	}

	render() {
		return (
			<React.Fragment>
				<Hero classes={classes.Hero_Config}>
					<SearchBox choosenCoordsHandler={this.choosenCoordsHandler} findBtnHandler={this.findBtnHandler} address={this.props.address} coords={this.props.coords} />
				</Hero>
				<OrderTutorial />
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		coords: state.coordsReducer.homeCoords,
		address: state.coordsReducer.homeAddress
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetCoords: (coords, address) => dispatch({type: actionTypes.SET_HOME_COORDS, coords, address})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(homeSearch))