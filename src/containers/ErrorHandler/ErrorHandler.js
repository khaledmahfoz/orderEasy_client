import React from 'react'
import {connect} from 'react-redux'

import * as actionTypes from '../../store/actions/actionTypes'

class ErrorHandler extends React.Component {
   render() {
      let content = <div>something went wrong</div>
      if (!this.props.error) {
         content = null
      }
      return content
   }
}

const mapStateToProps = state => {
   return {
      error: state.errorHandlerReducer.error,
      msg: state.errorHandlerReducer.msg
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSetErrorOn: (error, msg) => dispatch({type: actionTypes.SET_ERROR_OFF, error, msg}),
      onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler)