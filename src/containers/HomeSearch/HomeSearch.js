import React from 'react'
import { connect } from 'react-redux'

import Hero from '../../components/Hero/Hero'
import SearchBox from '../../components/SearchBox/SearchBox'
import Modal from '../../components/UI/Modal/Modal'
import OrderTutorial from '../../components/OrderTutorial/OrderTutorial'
import Map from '../Map/Map'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionTypes from '../../store/actions/actionTypes'
import * as searchItemCreators from '../../store/actions/searchItem'
import InputFull from '../../components/InputFull/InputFull'
import SearchItem from '../../components/SearchBox/SearchItem/SearchItem'

class homeSearch extends React.Component {
	// state = {
	// 	address: '',
	// 	coords: null,
	// 	suggested: [],
	// 	//ui
	// 	// modal: false,
	// 	locate: false,
	// 	loading: false,
	// 	smallLoading: false,
	// }

	// openModal = () => {
	// 	this.setState({ modal: true })
	// }

	// closeModal = () => {
	// 	this.setState({ modal: false })
	// }

	// createMap = (locate, coords) => {
	// 	this.setState({
	// 		locate: locate,
	// 		coords: coords,
	// 		suggested: null,
	// 		address: '',
	// 		loading: false,
	// 	})
	// 	this.props.onOpenModal()
	// }

	// locateAddress = () => {
	// 	this.setState({ loading: true })
	// 	const geo_success = position => {
	// 		this.createMap(true, position.coords)
	// 	}
	// 	const geo_error = () => {
	// 		this.createMap(false, null)
	// 	}
	// 	const geo_options = {
	// 		enableHighAccuracy: true,
	// 		maxAge: 0,
	// 		timeout: 30000,
	// 	}
	// 	navigator.geolocation.getCurrentPosition(
	// 		geo_success,
	// 		geo_error,
	// 		geo_options
	// 	)
	// }

	// suggestAddress = e => {
	// 	this.setState({ address: e.target.value, smallLoading: true })
	// 	geocode(e.target.value, cb => {
	// 		this.setState({ suggested: cb.items, smallLoading: false })
	// 	})
	// }

	clearInput = e => {
		console.log(e.target.tagName.toUpperCase())
	}

	render() {
		return (
			<React.Fragment>
				{/* <Modal
					center
					show={this.props.modal}
					closeModal={this.props.onCloseModal}
					title='Search using Map'>
					<InputFull
						suggestAddress={this.props.onSuggestAddress}
						address={this.props.address}
						suggested={this.props.suggested}
						createMap={this.props.onLocateAddress}
						clearInput={this.clearInput}
						smallLoading={this.props.smallLoading}
					/>
					{!this.props.locate ? 'sorry' : <Map coords={this.props.coords} />}
				</Modal> */}

				<Hero height='80vh'>
					{/* <SearchBox
						suggestAddress={this.props.onSuggestAddress}
						locateAddress={this.props.onLocateAddress}
						address={this.props.address}
						suggested={this.props.suggested}
						createMap={this.props.onLocateAddress}
						clearInput={this.clearInput}
						smallLoading={this.props.smallLoading}
					/> */}
					<SearchBox />
				</Hero>

				<OrderTutorial />
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		modal: state.modal,
		address: state.address,
		coords: state.coords,
		suggested: state.suggested,
		//ui
		locate: state.locate,
		loading: state.loading,
		smallLoading: state.smallLoading,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOpenModal: () => dispatch({ type: actionTypes.OPEN_MODAL }),
		onCloseModal: () => dispatch({ type: actionTypes.CLOSE_MODAL }),
		onLocateAddress: () => dispatch(searchItemCreators.locateAddress()),
		onSuggestAddress: eventTarget =>
			dispatch(searchItemCreators.suggestAddress(eventTarget)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(homeSearch)
