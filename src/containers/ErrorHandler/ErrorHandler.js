import React from 'react'
import {connect} from 'react-redux'

import classes from './ErrorHandler.module.css'

import * as actionTypes from '../../store/actions/actionTypes'

class ErrorHandler extends React.Component {
   render() {
      let content = (
         <div className={classes.ErrorHandler}>
            <div>
               <p>{this.props.msg}</p>
               <span onClick={this.props.onSetErrorOff}>
                  &times;
               </span>
            </div>
         </div>
      )
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
      onSetErrorOff: () => dispatch({type: actionTypes.SET_ERROR_OFF})
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler)