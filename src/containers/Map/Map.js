import React from "react";

import classes from "./Map.module.css";
import Marker from "../../assets/images/marker.png";

import { SmallLoading } from "../../components/UI/SmallLoading/SmallLoading";

import { H, defaultLayers } from "./Credentials/Credentials";
import reverseGeocode from "./ReverseGeocode/ReverseGeocode";
import createZone from "./createZone/createZone";
import { baseUrl } from "../../util/baseUrl";

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();
	}

	state = {
		map: null,
		addressTitle: null,
		coords: this.props.coords,
		dragLoading: true,
		searchResult: true,
		zoneResult: true,
		result: true,
		error: false,
	};

	checkResturants = (coords) => {
		fetch(baseUrl + "resturants/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				coords: coords,
			}),
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error("something went wrong");
				}
				return res.json();
			})
			.then((resturants) => {
				reverseGeocode(coords, (cb) => {
					if (cb instanceof Error) {
						this.setState({
							error: true,
							coords: null,
							dragLoading: false,
							result: false,
						});
					} else if (!cb) {
						this.setState({
							addressTitle: "",
							coords: null,
							dragLoading: false,
							result: false,
						});
					} else {
						this.setState({
							addressTitle: cb.title,
							dragLoading: false,
							result: true,
						});
						if (!resturants.length) {
							this.setState({ searchResult: false, coords: null });
						} else {
							this.setState({ searchResult: true, coords });
						}
					}
				});
			})
			.catch((err) => {
				this.setState({
					addressTitle: err.message,
					coords: null,
					dragLoading: false,
					result: false,
				});
			});
	};

	checkResturantZone = (coords) => {
		fetch(baseUrl + "check-zone/" + this.props.resturantId, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				coords: coords,
			}),
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error("something went wrong");
				}
				return res.json();
			})
			.then((check) => {
				reverseGeocode(coords, (cb) => {
					if (cb instanceof Error) {
						this.setState({
							error: true,
							coords: null,
							dragLoading: false,
							result: false,
						});
					} else if (!cb) {
						this.setState({
							addressTitle: "",
							dragLoading: false,
							result: false,
							coords: null,
						});
					} else {
						this.setState({
							addressTitle: cb.title,
							dragLoading: false,
							result: true,
						});
						if (!check) {
							this.setState({ zoneResult: false, coords: null });
						} else {
							this.setState({ zoneResult: true, coords });
						}
					}
				});
			})
			.catch((err) => {
				this.setState({
					addressTitle: err.message,
					dragLoading: false,
					result: false,
					coords: null,
				});
			});
	};

	dragEndHandler = (map, circleElem) => {
		this.setState({ dragLoading: true });
		let coords = map.getCenter();
		map.setCenter(coords);
		coords = { latitude: coords.lat, longitude: coords.lng };

		circleElem &&
			circleElem.setCenter({ lat: coords.latitude, lng: coords.longitude });

		if (this.props.isResturant) {
			reverseGeocode(coords, (cb) => {
				if (cb instanceof Error) {
					this.setState({
						error: true,
						coords: null,
						dragLoading: false,
						result: false,
					});
				} else if (!cb) {
					this.setState({
						map,
						coords: null,
						addressTitle: "",
						dragLoading: false,
						result: false,
					});
				} else {
					this.setState({
						map,
						coords,
						addressTitle: cb.title,
						dragLoading: false,
						result: true,
					});
				}
			});
		} else if (this.props.resturantId) {
			this.checkResturantZone(coords);
		} else {
			this.checkResturants(coords);
		}
	};

	componentDidMount() {
		const map = new H.Map(
			this.mapRef.current,
			defaultLayers.vector.normal.map,
			{
				center: {
					lat: this.props.coords.latitude,
					lng: this.props.coords.longitude,
				},
				zoom: 14,
				pixelRatio: window.devicePixelRatio || 1,
			}
		);
		window.addEventListener("resize", () => map.getViewPort().resize());

		new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
		H.ui.UI.createDefault(map, defaultLayers);

		let circleElem;
		if (this.props.isResturant) {
			circleElem = createZone(
				this.props.coords.latitude,
				this.props.coords.longitude
			);
			map.addObject(circleElem);
		}

		if (this.props.isResturant) {
			reverseGeocode(this.props.coords, (cb) => {
				if (cb instanceof Error) {
					this.setState({
						error: true,
						coords: null,
						dragLoading: false,
						result: false,
					});
				} else if (!cb) {
					this.setState({
						map,
						addressTitle: "",
						dragLoading: false,
						result: false,
					});
				} else {
					this.setState({
						map,
						addressTitle: cb.title,
						dragLoading: false,
						result: true,
					});
				}
			});
		} else if (this.props.resturantId) {
			this.checkResturantZone(this.props.coords);
		} else {
			this.checkResturants(this.props.coords);
		}

		map.addEventListener(
			"dragend",
			(evt) => {
				this.dragEndHandler(map, circleElem);
			},
			{ passive: false }
		);
	}

	componentWillUnmount() {
		if (this.state.map) {
			this.state.map.dispose();
		}
		this.setState({ addressTitle: null, error: false });
	}

	render() {
		let btnContent;
		if (this.state.dragLoading) {
			btnContent = (
				<div className={classes.DragLoadingWrap}>
					<SmallLoading color="#ffffff" />
					<div>Detecting location</div>
				</div>
			);
		} else {
			if (!this.state.searchResult || !this.state.result) {
				btnContent = "No resturants available in your area";
			} else if (!this.state.zoneResult) {
				btnContent = "Sorry, this resturant doesn't deliver to your location";
			} else {
				btnContent = this.props.btnValue;
			}
		}
		return (
			<React.Fragment>
				<div>
					<div className={classes.Map} ref={this.mapRef}>
						<img src={Marker} alt="marker" draggable="false" />
					</div>
					{this.state.error ? (
						<p className={classes.ErrorTitle}>something went wrong</p>
					) : this.state.addressTitle ? (
						<p className={classes.AddressTitle}>
							Deliver To: {this.state.addressTitle}
						</p>
					) : null}

					<button
						className={classes.DeliverHere}
						onClick={() =>
							this.props.locateAddressFinished(
								this.state.addressTitle,
								this.state.coords
							)
						}
						disabled={
							this.state.dragLoading ||
							!this.state.searchResult ||
							!this.state.zoneResult ||
							!this.state.result
						}
					>
						{btnContent}
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default Map;
