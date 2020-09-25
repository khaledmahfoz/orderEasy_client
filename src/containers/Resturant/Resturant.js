import React from 'react'
import {connect} from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import StarRatings from 'react-star-ratings'

import classes from '../Resturant/Resturant.module.css'

import Hero from '../../components/Hero/Hero'
import SearchItem from '../../components/SearchBox/SearchItem/SearchItem'
import SectionSpinner from '../../components/UI/SectionSpinner/SectionSpinner'
import InputFull from '../../components/InputFull/InputFull'
import * as actionTypes from '../../store/actions/actionTypes'
import Modal from '../../components/UI/Modal/Modal'
import Map from '../Map/Map'
import Spinner from '../../components/UI/Spinner/Spinner'
import ResturantReviews from '../../components/ResturantReviews/ResturantReviews'
import Menu from '../../components/Menu/Menu'
import {baseUrl} from '../../util/baseUrl'
import WrapperCard from '../../components/UI/WrapperCard/WrapperCard'
import Cash from '../../components/UI/Cash/Cash'


class Resturant extends React.Component {
	_isMounted = false;

	state = {
		resturant: null,
		loading: true,
		menu: false,
		showReviews: false,
		address: '',
		coords: null,
		reviews: null
	}

	// updatedReviewsFinishedHandler = (reviews) => {
	// 	// this.setState({reviews: reviews})
	// }

	resturantHandler = () => {
		fetch(baseUrl + 'resturant/' + this.props.match.params.id)
			.then(res => {
				if (res.status !== 200) {
					this.props.history.replace('/404')
				}
				return res.json()
			})
			.then(resturant => {
				console.log(resturant)
				if (this.props.coords) {
					fetch(baseUrl + "check-zone/" + this.props.match.params.id, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							coords: this.props.coords
						})
					})
						.then(res => res.json())
						.then(check => {
							this.setState({
								loading: false, resturant, reviews: resturant.reviews, menu: check,
								coords: check ? this.props.coords : null,
								address: check ? this.props.address : ''
							})
						})
						.catch(err => console.log(err))
				} else {
					this.setState({loading: false, resturant, reviews: resturant.reviews, menu: false})
				}

			})
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.resturantHandler()
		// this._isMounted = true;
		// if (this._isMounted) {
		// }
	}

	choosenCoordsHandler = (coords, address) => {
		this.setState({coords, address})
		this.props.onSetCoords(coords, address)
	}

	findBtnHandler = () => {
		this.setState({menu: true})
		console.log('Menu')
	}

	menuSwapContentHandler = () => {
		this.setState(prevState => {
			return {showReviews: !prevState.showReviews}
		})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		let menuSwapContent
		if (!this.state.showReviews && this.state.menu) {
			console.log(this.state.resturant)
			menuSwapContent = (
				<Menu menu={this.state.resturant.menu} resturantId={this.state.resturant._id} />
			)
		} else {
			menuSwapContent = (
				<ResturantReviews reviews={this.state.reviews} />
			)
		}
		console.log(this.state.resturant)
		return this.state.loading ? (
			<div style={{minHeight: 'calc(100vh - 358px)', position: 'relative'}}>
				<SectionSpinner />
			</div>
		) : (
				<React.Fragment>
					<header className={classes.Header}>
						<Hero classes={classes.Hero_Config}></Hero>
						<div className={`${classes.Lip_Section} ${this.state.menu && classes.Lip_Section_Config}`}>
							<div className={`${classes.Lip_Content} ${!this.state.menu && classes.Lip_Content_Config}`}>
								<div className={classes.Resturant_Img} style={{backgroundImage: `url(${'http://localhost:8080/' + this.state.resturant.imgUrl})`}}>
								</div>
								<h3 className={classes.Title}>{this.state.resturant.title}</h3>
								<p className={classes.Desc}>{this.state.resturant.description}</p>
								<div className={classes.Rate}>
									<StarRatings
										rating={this.state.resturant.rate}
										starRatedColor="var(--primeColor)"
										starDimension="1.4rem"
										starSpacing="1px"
										numberOfStars={5}
										name='makeRatings'
									/>
									<span>({this.state.resturant.reviewers})</span>
									{/* {this.state.resturant.rate} */}
								</div>
								<p className={classes.Main}>{this.state.resturant.catagory}</p>
								<div className={classes.Hours}>
									<p>open hours</p>
									<span>2 - 3</span>
									{/* <p>{this.state.resturant.openHours}</p> */}
								</div>
								<div className={classes.Payment}>
									<p>payment Methods</p>
									{/* <div>{this.state.resturant.payment}</div> */}
									<span><Cash /></span>
								</div>
							</div>
							{!this.state.menu ? (
								<div className={classes.Lip_Search}>
									<form
										className={classes.AddressForm}
										onSubmit={e => e.preventDefault()}>
										<SearchItem
											btnValue={'Deliver Here'}
											selectBtnValue='Menu'
											choosenCoordsHandler={this.choosenCoordsHandler}
											findBtnHandler={this.findBtnHandler}
											resturantId={this.props.match.params.id}
											address={this.state.address}
											coords={this.state.coords}
										/>
									</form>
								</div>
							) : null}
						</div>
					</header>
					<div className={classes.ResWrapper}>
						{!this.state.menu ? (
							<ResturantReviews reviews={this.state.reviews} />
						) : (
								<React.Fragment>
									<button className={classes.SwapBtn} onClick={this.menuSwapContentHandler}>
										{!this.state.showReviews ? 'Swap to Reviews !' : 'Swap to Menu !'}
									</button>
									{menuSwapContent}
								</React.Fragment>
							)}

					</div>
				</React.Fragment>
			)
	}
}

const mapStateToProps = state => {
	return {
		coords: state.coordsReducer.homeCoords,
		address: state.coordsReducer.homeAddress,
		// isResturant: state.authReducer.isResturant
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetCoords: (coords, address) => dispatch({type: actionTypes.SET_HOME_COORDS, coords, address})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Resturant))
