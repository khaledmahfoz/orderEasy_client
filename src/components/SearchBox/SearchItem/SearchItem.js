import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import classes from './SearchItem.module.css'
import LocateIcon from '../../../assets/images/locate_gps2.png'

import Modal from '../../UI/Modal/Modal'
import Map from '../../../containers/Map/Map'
import InputFull from '../../InputFull/InputFull'
import SearchList from '../SearchItem/SearchList/SearchList'
import Spinner from '../../UI/Spinner/Spinner'
import reverseGeocode from '../../../containers/Map/ReverseGeocode/ReverseGeocode'
import {geocode} from '../../../containers/Map/Geocode/Geocode'
import {SmallLoadingMenu} from '../../UI/SmallLoading/SmallLoading'
import {withRouter} from 'react-router-dom'

class searchItem extends Component {
	state = {
		showModal: false,
		inputVal: '',
		inputLoading: false,
		loading: false,
		locateStatus: false,
		locked: false,
		coords: null,
		suggestedAddressesList: null,
	}
	closeModal = () => {
		this.setState({showModal: false, loading: false})
	}
	openModal = () => {
		this.setState({showModal: true, loading: false})
	}
	showCoordsOnMap = (locateStatus, coords) => {
		this.setState({
			loading: true,
			locateStatus: locateStatus,
			coords: coords,
			suggestedAddressesList: null,
			inputVal: ''
		})
		this.openModal()
	}

	locateAddress = () => {
		this.setState({loading: true})
		const geo_success = position => {
			let coords = {latitude: position.coords.latitude, longitude: position.coords.longitude}
			this.showCoordsOnMap(true, coords)
		}
		const geo_error = () => {
			this.showCoordsOnMap(false, null)
		}
		const geo_options = {
			enableHighAccuracy: true,
			maxAge: 0,
			timeout: 30000,
		}
		navigator.geolocation.getCurrentPosition(
			geo_success,
			geo_error,
			geo_options
		)
	}

	locateAddressFinished = (address, coords) => {
		this.setState({inputVal: address, locked: true})
		this.props.choosenCoordsHandler(coords)
		this.closeModal()
	}

	unlockInput = () => {
		this.setState({locked: false, inputVal: '', coords: null})
		this.props.choosenCoordsHandler(null)
	}

	changeInputHandler = value => {
		if (this.state.locked) {
			this.unlockInput()
		}
		this.setState({inputVal: value, inputLoading: true})
		geocode(value, cb => {
			this.setState({suggestedAddressesList: cb.items, inputLoading: false})
		})
	}
	render() {
		let indicator
		if (this.state.locked) {
			indicator = (
				<a className={classes.LocateBtn} onClick={this.unlockInput}>
					X
				</a>
			)
		} else if (this.state.inputLoading) {
			indicator = <SmallLoadingMenu color='#f86932' />
		} else {
			indicator = (
				<a className={classes.LocateBtn} onClick={this.locateAddress}>
					<img src={LocateIcon} alt='locate' draggable='false' />
				</a>
			)
		}
		return (
			<React.Fragment>
				{this.state.loading ? <Spinner /> : null}
				<Modal
					center
					show={this.state.showModal}
					closeModal={this.closeModal}
					title='Search using Map'>
					{/* <InputFull
						suggestAddress={this.props.onSuggestAddress}
						address={this.props.address}
						suggested={this.props.suggested}
						createMap={this.props.onLocateAddress}
						clearInput={this.clearInput}
						smallLoading={this.props.smallLoading}
					/> */}
					{this.state.locateStatus ? (
						<Map
							choosenCoordsHandler={this.choosenCoordsHandler}
							locateAddressFinished={this.locateAddressFinished}
							btnValue={this.props.btnValue}
							isResturant={this.props.isResturant ? this.props.isResturant : false}
							coords={this.state.coords}
						/>
					) : (
							<p>Please give access to your location</p>
						)}
				</Modal>

				<div className={classes.AddressInput}>
					<input
						className={this.props.isResturant ? classes.AddressInputResturant : classes.AddressInputStyle}
						type='text'
						placeholder='Please search for your location'
						onChange={e => this.changeInputHandler(e.target.value)}
						value={this.state.inputVal}
						disabled={this.state.locked ? true : false}
					/>

					{indicator}

					{this.state.inputVal ? (
						<React.Fragment>
							<SearchList
								createMap={this.showCoordsOnMap}
								suggested={this.state.suggestedAddressesList}
							/>
						</React.Fragment>
					) : null}
				</div>
				{
					!this.props.isResturant ?
						<button onClick={this.props.findBtnHandler} className={classes.ResturantBtn}>
							{this.props.btnValue}
						</button>
						: null
				}
			</React.Fragment>
		)
	}
}
// const searchItem = props => {
// 	return (
// 		<form className={classes.AddressForm} onSubmit={e => e.preventDefault()}>
// 			<div className={classes.AddressInput}>
// 				<input
// 					type='text'
// 					placeholder='Please search for your location'
// 					onChange={e => props.suggestAddress(e.target.value)}
// 					onBlur={props.clearInput}
// 					value={props.address}
// 				/>
// 				{props.smallLoading ? (
// 					<SmallLoadingMenu color='#f86932' />
// 				) : (
// 					<a className={classes.LocateBtn} onClick={props.locateAddress}>
// 						<img src={LocateIcon} alt='locate' draggable='false' />
// 					</a>
// 				)}

// 				{props.address ? (
// 					<SearchList createMap={props.createMap} suggested={props.suggested} />
// 				) : null}
// 			</div>
// 			<button className={classes.ResturantBtn} onClick={props.clickHandler}>
// 				{props.btnValue}
// 			</button>
// 		</form>
// 	)
// }

export default withRouter(searchItem)
