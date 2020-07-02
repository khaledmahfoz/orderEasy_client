import React from 'react'

import classes from './Map.module.css'
import Marker from '../../assets/images/marker.png'

import { SmallLoading } from '../../components/UI/SmallLoading/SmallLoading'

import { H, defaultLayers } from './Credentials/Credentials'
import reverseGeocode from './ReverseGeocode/ReverseGeocode'

class Map extends React.Component {
	constructor(props) {
		super(props)
		this.mapRef = React.createRef()
	}

	state = {
		map: null,
		addressTitle: null,
		dragLoading: true,
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

		// window.addEventListener('resize', () => map.getViewPort().resize())

		map.addEventListener('dragend', event => {
			console.log(map.getCenter())
			this.setState({ dragLoading: true })
			let coords = map.getCenter()
			coords = { latitude: coords.lat, longitude: coords.lng }
			reverseGeocode(coords, cb =>
				this.setState({ map, addressTitle: cb.title, dragLoading: false })
			)
		})

		new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

		H.ui.UI.createDefault(map, defaultLayers)

		reverseGeocode(this.props.coords, cb =>
			this.setState({ map, addressTitle: cb.title, dragLoading: false })
		)
	}

	componentWillUnmount() {
		if (this.state.map) {
			this.state.map.dispose()
		}
		this.setState({ addressTitle: null })
	}

	render() {
		console.log(this.state.addressTitle)
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
				<button className={classes.DeliverHere}>
					{this.state.dragLoading ? (
						<div className={classes.DragLoadingWrap}>
							<SmallLoading color='#ffffff' />
							<div>Detecting location</div>
						</div>
					) : (
						'Deliver Here!'
					)}
				</button>
			</React.Fragment>
		)
	}
}

export default Map
