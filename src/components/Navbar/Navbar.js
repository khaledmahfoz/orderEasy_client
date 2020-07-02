import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

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
		console.log(this.props)
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
					<AuthLogin signupLinkHandler={this.signupLinkHandler} />
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

export default withRouter(Navbar)
