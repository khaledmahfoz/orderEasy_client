import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionTypes from './store/actions/actionTypes'

import './App.css'

// import Admin from './containers/Admin/Admin'
import MyResturant from './containers/MyResturant/MyResturant'

import Layout from './components/Layout/Layout'
import HomeSearch from './containers/HomeSearch/HomeSearch'
import AllResturants from './containers/AllResturants/AllResturants'
import Resturants from './containers/Resturants/Resturants'
import Resturant from './containers/Resturant/Resturant'
import AuthSignup from './components/AuthSignup/AuthSignup'
import Orders from './containers/Orders/Orders'
import {setCartAsync} from './store/actions/cartCreators'

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem("token")
		const id = localStorage.getItem("id")
		const isResturant = JSON.parse(localStorage.getItem("isResturant"))
		const title = localStorage.getItem("title")
		const coords = JSON.parse(localStorage.getItem("coords"))
		const address = localStorage.getItem("address")
		const cart = JSON.parse(localStorage.getItem("cart"))
		if (token) {
			this.props.onAutoLogin(token, id, isResturant, title)
		}
		if (coords && address) {
			this.props.onAutoCoords(coords, address)
		}
		if (cart) {
			this.props.onAutoCart(cart, this.props.Authenticated, this.props.token)
		}
	}
	render() {
		return (
			<div className='App'>
				<Layout>
					{
						this.props.Authenticated
						&& (
							<React.Fragment>
								<Route path='/orders' component={Orders} />
								{
									this.props.isResturant
									&& (
										<React.Fragment>
											{/* <Route path="/admin" component={Admin} /> */}
											<Route path="/my-resturant/:id" component={MyResturant} />
										</React.Fragment>
									)
								}
							</React.Fragment>
						)
					}
					{!this.props.Authenticated
						&& (
							<React.Fragment>
								<Route path='/signup' component={AuthSignup} />
							</React.Fragment>
						)
					}
					{
						!this.props.isResturant
						&& (
							<React.Fragment>
								<Route path='/' exact component={HomeSearch} />
								<Route path='/resturant/:id' component={Resturant} />
								<Route path='/all-resturants' exact component={AllResturants} />
								<Route path='/resturants' exact component={Resturants} />
							</React.Fragment>
						)
					}
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		token: state.authReducer.token,
		Authenticated: state.authReducer.token !== null,
		isResturant: state.authReducer.isResturant
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAutoLogin: (token, id, isResturant, title) => dispatch({type: actionTypes.AUTH_SUCCESS, token, id, isResturant, title}),
		onAutoCoords: (coords, address) => dispatch({type: actionTypes.SET_HOME_COORDS, coords, address}),
		onAutoCart: (cart, Authenticated, token) => dispatch(setCartAsync(cart, Authenticated, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
