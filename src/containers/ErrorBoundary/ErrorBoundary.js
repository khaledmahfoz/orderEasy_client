import React from 'react'
import classes from './ErrorBoundary.module.css';
import {withRouter} from 'react-router-dom'

class ErrorBoundary extends React.Component {
   constructor(props) {
      super(props);
      this.state = {hasError: false};
   }

   static getDerivedStateFromError() {
      return {hasError: true};
   }

   switchHandler = () => {
      this.setState({hasError: false})
      this.props.history.replace('/')
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className={classes.ErrorBoundary}>
               <h1>Something went wrong</h1>
               <button onClick={this.switchHandler}>Go Back</button>
            </div>
         )
      }
      return this.props.children;
   }
}

export default withRouter(ErrorBoundary)