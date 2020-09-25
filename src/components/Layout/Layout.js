import React from 'react'
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions/actionTypes'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import SideNav from '../SideNav/SideNav'
import ErrorHandler from '../../containers/ErrorHandler/ErrorHandler'

class Layout extends React.Component {
   state = {
      sideNav: false
   }

   toggleSideNav = () => {
      this.setState(prevState => {
         return {
            sideNav: !prevState.sideNav
         }
      })
   }

   render() {
      return (
         <React.Fragment>
            <ErrorHandler />
            <Navbar toggleSideNav={this.toggleSideNav} />
            <SideNav
               sideNav={this.state.sideNav}
               toggleSideNav={this.toggleSideNav}
               Authenticated={this.props.Authenticated}
               isResturant={this.props.isResturant}
               title={this.props.title}
               logoutHandler={this.props.onLogout}
            />
            <main>{this.props.children}</main>
            {/* <Footer /> */}
         </React.Fragment>
      )
   }
}

const mapStateToProps = state => {
   return {
      token: state.authReducer.token,
      Authenticated: state.authReducer.token !== null,
      isResturant: state.authReducer.isResturant,
      title: state.authReducer.title
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onLogout: () => dispatch({type: actionTypes.LOG_OUT})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)