import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'

import classes from './Navbar.module.css'

import Modal from '../UI/Modal/Modal'
import AuthLogin from '../AuthLogin/AuthLogin'
import Cart from '../../containers/Cart/Cart'
import Dropdown from '../Dropdown/Dropdown'
// import Bag from '../../assets/images/Bag.png'
import Bag from '../UI/Bag/Bag'

class Navbar extends Component {
	state = {
		showModal: false,
		title: '',
		checkSwap: false,
		showDropdownMenu: false,
		dropdownRef: null
	}

	openModal = title => {
		this.setState({showModal: true, title: title})
	}

	closeModal = () => {
		this.setState({showModal: false})
	}

	signupLinkHandler = () => {
		this.closeModal()
		this.props.history.push('/signup')
	}

	logoutHandler = () => {
		this.props.onLogout()
		this.props.history.replace('/')
	}

	swipeContent = (cart) => {
		this.setState({checkSwap: true}, () => {
			cart ? this.openModal('Cart') : this.openModal('Sign in')
		})
	}

	showModalHandler = () => {
		this.setState(prevState => {
			return {
				showModal: !prevState.showModal
			}
		})
	}

	checkSwapHandler = () => {
		this.setState({checkSwap: false})
	}

	setDropdownRef = (elem) => {
		this.setState({dropdownRef: elem})
	}

	closeDropdownMenu = (e) => {
		let dropdownRef = this.state.dropdownRef
		if (!dropdownRef.contains(e.target) && e.target.id.toString() !== 'menuBtn') {
			// this.setState({showDropdownMenu: false})
			this.forceCloseDropdownMenu()
		}
	}

	forceCloseDropdownMenu = () => {
		this.setState({showDropdownMenu: false})
	}

	switchDropdownMenu = () => {
		this.setState(prevState => {
			return {
				showDropdownMenu: !prevState.showDropdownMenu
			}
		})
	}

	render() {
		let content
		if (this.state.title === 'Sign in') {
			content = (
				<AuthLogin
					showModal={this.state.showModal}
					signupLinkHandler={this.signupLinkHandler}
					swipeContent={this.swipeContent}
					checkSwap={this.state.checkSwap}
					checkSwapHandler={this.checkSwapHandler}
					showModalHandler={this.showModalHandler}
				/>
			)
		} else {
			content = <Cart closeModal={this.closeModal} swipeContent={this.swipeContent} />
		}
		return (
			<React.Fragment>
				<div className={classes.Navbar}>
					<div className={classes.Logo}>
						{
							this.props.isResturant
								? <Link to={`/my-resturant/${this.props.id}/`}>
									My Resturant
									</Link>
								: <Link to='/'>Home</Link>
						}
					</div>
					<div className={classes.List}>
						<ul>
							{
								this.props.isResturant
								&& (
									<li>
										<Link to='/orders'>Orders</Link>
									</li>
								)
							}

							{
								!this.props.isResturant
								&& (
									<li>
										<Link to='/all-resturants'>Resturants</Link>
									</li>
								)
							}

							<li>
								{
									this.props.Authenticated ?
										<div>
											<button id="menuBtn" onClick={this.switchDropdownMenu}>
												{this.props.title}
											</button>
											{
												this.state.showDropdownMenu &&
												<Dropdown
													forceCloseDropdownMenu={this.forceCloseDropdownMenu}
													setDropdownRef={this.setDropdownRef}
													closeDropdownMenu={this.closeDropdownMenu}
													isResturant={this.props.isResturant} logoutHandler={this.logoutHandler} />
											}
										</div>
										:
										<button onClick={() => this.openModal('Sign in')}>
											Sign in
										</button>
								}

							</li>
							{
								!this.props.isResturant
								&& (
									<li>
										<button onClick={() => this.openModal('Cart')}>
											{/* <img src={Bag} style={{
												width: '2rem',
												height: 'auto'
											}} /> */}
											<Bag />
										</button>
									</li>
								)
							}
						</ul>
					</div>
				</div>
				{
					!this.props.isResturant
					&& (
						<Modal
							title={this.state.title}
							show={this.state.showModal}
							closeModal={this.closeModal}>
							{content}
						</Modal>
					)
				}
			</React.Fragment>
		)
	}
}


const mapStateToProps = state => {
	return {
		Authenticated: state.authReducer.token !== null,
		isResturant: state.authReducer.isResturant,
		title: state.authReducer.title,
		id: state.authReducer.id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch({type: actionTypes.LOG_OUT})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
