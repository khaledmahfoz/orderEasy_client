import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './SearchItem.module.css'
import LocateIcon from '../../../assets/images/locate_gps2.png'

import Modal from '../../UI/Modal/Modal'
import Map from '../../../containers/Map/Map'
import InputFull from '../../InputFull/InputFull'
import SearchList from '../SearchItem/SearchList/SearchList'
import Spinner from '../../UI/Spinner/Spinner'
import {geocode} from '../../../containers/Map/Geocode/Geocode'
import {SmallLoadingMenu} from '../../UI/SmallLoading/SmallLoading'
import {withRouter} from 'react-router-dom'
import * as actionTypes from '../../../store/actions/actionTypes'

class searchItem extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		showModal: false,
		inputVal: '',
		inputLoading: false,
		loading: false,
		locateStatus: false,
		locked: this.props.coords ? true : false,
		coords: null,
		choosenCoords: null,
		suggestedAddressesList: null,
		invalid: false
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
		this.setState({loading: true, invalid: false})
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
		if (coords) {
			this.setState({inputVal: address, locked: true, coords})
			this.props.choosenCoordsHandler && this.props.choosenCoordsHandler(coords, address)
		}
		this.closeModal()
	}

	unlockInput = () => {
		this.setState({locked: false, inputVal: '', coords: null})
		this.props.choosenCoordsHandler && this.props.choosenCoordsHandler(null, '')
	}

	changeInputHandler = value => {
		this.props.onSetErrorOff()
		if (this.state.locked) {
			this.unlockInput()
		}
		this.setState({inputVal: value, inputLoading: true, invalid: false})
		geocode(value, cb => {
			if (cb instanceof Error) {
				this.setState({inputLoading: false})
				this.props.onSetErrorOn('something went wrong')
			} else {
				this.setState({suggestedAddressesList: cb.items, inputLoading: false})
			}
		})
	}

	findBtnHandler = () => {
		if (this.props.coords) {
			this.props.findBtnHandler()
		} else {
			this.setState({invalid: true})
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.coords !== this.props.coords) {
			this.setState({locked: this.props.coords ? true : false})
		}
	}

	render() {
		let indicator
		if (this.state.locked) {
			indicator = (
				<a style={{textAlign: 'center'}} className={classes.LocateBtn} onClick={this.unlockInput}>
					<svg style={{
						width: '75%',
						height: 'auto',
						backgroundColor: '#959595',
						color: 'white',
						borderRadius: '50%'
					}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
						<path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
					</svg>
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
							locateAddressFinished={this.locateAddressFinished}
							btnValue={this.props.btnValue}
							isResturant={this.props.isResturant ? this.props.isResturant : false}
							resturantId={this.props.resturantId ? this.props.resturantId : null}
							coords={this.state.coords}
						/>
					) : (
							<p style={{textAlign: 'center'}}>
								Please give access to your location
							</p>
						)}
				</Modal>

				<div className={classes.AddressInput}>
					<input
						className={this.props.isResturant ? classes.AddressInputResturant : classes.AddressInputStyle}
						type='text'
						placeholder='Please search for your location'
						onChange={e => this.changeInputHandler(e.target.value)}
						value={this.props.address ? this.props.address : this.state.inputVal}
						disabled={this.state.locked ? true : false}
					/>
					{this.state.invalid ?
						<div className={classes.InvalidAddress}>
							<p> please select a place </p>
							<span onClick={() => this.setState({invalid: false})}>
								<svg width="1.5rem" height="1.5rem" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
									<path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
								</svg>
							</span>
						</div> : null}

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
						<button type='button' onClick={this.findBtnHandler} className={classes.ResturantBtn}>
							{this.props.selectBtnValue}
						</button>
						: null
				}
			</React.Fragment>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetErrorOn: (msg) => dispatch({type: actionTypes.SET_ERROR_ON, msg}),
		onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
	}
}

export default connect(null, mapDispatchToProps)(withRouter(searchItem))
