import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Navbar.module.css'

import Modal from '../UI/Modal/Modal'
import AuthLogin from '../AuthLogin/AuthLogin'

class Navbar extends Component {
	state = {
		showModal: false,
		title: '',
	}

	openModal = title => {
		this.setState({ showModal: true, title: title })
	}

	closeModal = () => {
		this.setState({ showModal: false })
	}

	signupLinkHandler = () => {
		this.closeModal()
		this.props.history.push('/signup')
	}

	render() {
		let content
		if (this.state.title === 'Sign in') {
			content = <AuthLogin signupLinkHandler={this.signupLinkHandler} />
		} else {
			{
				content = !this.props.cart.length ? (
					<p>this cart is empty</p>
				) : (
					<p>here is your items</p>
				)
			}
		}
		return (
			<React.Fragment>
				<div className={classes.Navbar}>
					<div className={classes.Logo}>
						<Link to='/'>Logo</Link>
					</div>
					<div className={classes.List}>
						<ul>
							<li>
								<Link to='/resturants'>Resturants</Link>
							</li>
							<li>
								<button onClick={() => this.openModal('Sign in')}>
									Sign in
								</button>
							</li>
							<li>
								<button onClick={() => this.openModal('Cart')}>Cart</button>
							</li>
						</ul>
					</div>
				</div>
				<Modal
					title={this.state.title}
					show={this.state.showModal}
					closeModal={this.closeModal}>
					{content}
				</Modal>
			</React.Fragment>
		)
	}
}
// const navbar = props => {
// 	return (
// 		<div className={classes.Navbar}>
// 			<div className={classes.Logo}>
// 				<Link to='/'>Logo</Link>
// 			</div>
// 			<div className={classes.List}>
// 				<ul>
// 					<li>
// 						<Link to='/resturants'>Resturants</Link>
// 					</li>
// 					<li>
// 						<button>Sign in</button>
// 					</li>
// 					<li>
// 						<button>Cart</button>
// 					</li>
// 				</ul>
// 			</div>
// 		</div>
// 	)
// }

const mapStateToProps = state => {
	return {
		cart: state.cartReducer.cart,
	}
}

// const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps)(withRouter(Navbar))
