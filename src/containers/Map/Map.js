import React from 'react'

import classes from './Map.module.css'
import Marker from '../../assets/images/marker.png'

import {SmallLoading} from '../../components/UI/SmallLoading/SmallLoading'

import {H, defaultLayers} from './Credentials/Credentials'
import reverseGeocode from './ReverseGeocode/ReverseGeocode'
import createZone from './createZone/createZone'



class Map extends React.Component {
	constructor(props) {
		super(props)
		this.mapRef = React.createRef()
	}

	state = {
		map: null,
		addressTitle: null,
		coords: this.props.coords,
		dragLoading: true,
	}

	dragEndHandler = (map, circleElem) => {
		this.setState({dragLoading: true})
		let coords = map.getCenter()
		coords = {latitude: coords.lat, longitude: coords.lng}
		{circleElem && circleElem.setCenter({lat: coords.latitude, lng: coords.longitude})}
		reverseGeocode(coords, cb => {
			this.setState({map, addressTitle: cb.title, dragLoading: false, coords: {...this.state.coords, ...coords}})
		})
	}

	componentDidMount() {
		const map = new H.Map(
			this.mapRef.current,
			defaultLayers.vector.normal.map,
			{
				center: {
					lat: this.props.coords.latitude,
					lng: this.props.coords.longitude,
				},
				zoom: 18,
				pixelRatio: window.devicePixelRatio || 1,
			}
		)
		// window.addEventListener('resize', () => map.getViewPort().resize());

		let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

		let ui = H.ui.UI.createDefault(map, defaultLayers)

		if (this.props.isResturant) {
			let circleElem = createZone(map, this.props.coords.latitude, this.props.coords.longitude)
			map.addObject(circleElem)
			map.addEventListener('dragend', () => this.dragEndHandler(map, circleElem), {passive: false})
		} else {
			map.addEventListener('dragend', () => this.dragEndHandler(map))
		}

		reverseGeocode(this.props.coords, cb => {
			this.setState({map, addressTitle: cb.title, dragLoading: false})
		})

	}

	componentWillUnmount() {
		if (this.state.map) {
			this.state.map.dispose()
		}
		this.setState({addressTitle: null})
	}

	render() {
		return (
			<React.Fragment>
				<div className={classes.Map} ref={this.mapRef}>
					<img src={Marker} alt='marker' draggable='false' />
				</div>
				{this.state.addressTitle ? (
					<p className={classes.AddressTitle}>
						Deliver To: {this.state.addressTitle}
					</p>
				) : null}
				<button
					onClick={() => this.props.locateAddressFinished(this.state.addressTitle, this.state.coords)} className={classes.DeliverHere}>
					{this.state.dragLoading ?
						(
							<div className={classes.DragLoadingWrap}>
								<SmallLoading color='#ffffff' />
								<div>Detecting location</div>
							</div>
						) : this.props.btnValue
					}
				</button>
			</React.Fragment>
		)
	}
}

export default Map
