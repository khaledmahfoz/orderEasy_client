import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import classes from '../Resturant/Resturant.module.css'

import Hero from '../../components/Hero/Hero'
import SearchItem from '../../components/SearchBox/SearchItem/SearchItem'
import SectionSpinner from '../../components/UI/SectionSpinner/SectionSpinner'
import InputFull from '../../components/InputFull/InputFull'
import * as actionTypes from '../../store/actions/actionTypes'
import * as searchItemCreators from '../../store/actions/searchItem'
import Modal from '../../components/UI/Modal/Modal'
import Map from '../Map/Map'
import Spinner from '../../components/UI/Spinner/Spinner'
import ResturantReviews from '../../components/ResturantReviews/ResturantReviews'
import Menu from '../../components/Menu/Menu'

const testResturant = {
	id: 1,
	title: 'Resturant1',
	desc:
		'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
	rate: '3',
	main: 'Pizza and Burger',
	payment: 'cash, credit',
	openHours: '2 - 3',
}

class Resturant extends React.Component {
	state = {
		resturant: null,
		loading: true,
		menu: false,
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const query = new URLSearchParams(nextProps.location.search)
		const menuParam = query.get('menu')
		if (menuParam !== prevState.menu) {
			return {
				menu: menuParam,
			}
		}
		return null
	}

	componentDidMount() {
		//async code to get resturant data by id and reviews
		this.setState({
			resturant: testResturant,
			loading: false,
		})
	}
	render() {
		console.log(this.props)
		return this.state.loading ? (
			<div style={{ minHeight: 'calc(100vh - 358px)', position: 'relative' }}>
				<SectionSpinner />
			</div>
		) : (
			<React.Fragment>
				<header className={classes.Header}>
					<Hero height='500px'></Hero>
					<div className={classes.Lip_Section}>
						<div className={classes.Lip_Content}>
							<div className={classes.Resturant_Img}></div>
							<h3 className={classes.Title}>{this.state.resturant.title}</h3>
							<p className={classes.Desc}>{this.state.resturant.desc}</p>
							<div className={classes.Rate}>{this.state.resturant.rate}</div>
							<p className={classes.Main}>{this.state.resturant.main}</p>
							<div className={classes.Hours}>
								<p>open hours</p>
								<p>{this.state.resturant.openHours}</p>
							</div>
							<div className={classes.Payment}>
								<p>payment Methods</p>
								<div>{this.state.resturant.payment}</div>
							</div>
						</div>
						{!this.state.menu ? (
							<div className={classes.Lip_Search}>
								<SearchItem
									navigatePath={this.props.match.url + '?menu=true'}
									btnValue='Menu'
								/>
							</div>
						) : null}
					</div>
				</header>
				{!this.state.menu ? (
					<Route
						path={this.props.match.url}
						render={() => <ResturantReviews id={this.props.match.params.id} />}
					/>
				) : (
					<Route
						path={this.props.match.url}
						render={() => <Menu id={this.props.match.params.id} />}
					/>
				)}
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

export default withRouter(Resturant)
{
	/* {this.props.loading ? <Spinner /> : null}
				<Modal
					center
					show={this.props.modal}
					closeModal={this.props.onCloseModal}
					title='Search using Map'>
					<React.Fragment>
						<InputFull />
						{!this.props.locate ? 'sorry' : <Map coords={this.props.coords} />}
					</React.Fragment>
				</Modal> */
}
{
	/* <header className={classes.Header}>
					<Hero height='500px'></Hero>
					<div className={classes.Lip_Section}>
					<div className={classes.Lip_Content}>
							<div className={classes.Resturant_Img}></div>
							<h3>{this.state.resturant.title}</h3>
							<p>{this.state.resturant.desc}</p>
							</div>
						<div className={classes.Lip_Search}>
						<SearchItem
								suggestAddress={this.props.onSuggestAddress}
								locateAddress={this.props.onLocateAddress}
								address={this.props.address}
								suggested={this.props.suggested}
								createMap={this.props.onLocateAddress}
								clearInput={this.clearInput}
								smallLoading={this.props.smallLoading}
								clickHandler={() => console.log('navigate to menu')}
								btnValue='Menu'
							/>
							<SearchItem
								clickHandler={() => console.log('navigate to menu')}
								btnValue='Menu'
							/>
							</div>
							</div>
						</header> */
}
