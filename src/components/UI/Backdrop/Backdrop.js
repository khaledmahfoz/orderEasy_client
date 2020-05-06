import React from 'react'
import classes from './Backdrop.module.css';

const backdrop = props => {
   let backdropResult = <div className={classes.Backdrop}></div>
   if(props.closeModal){
      backdropResult = <div className={classes.Backdrop} onClick={props.closeModal}></div>
   }
   return backdropResult
}

export default backdrop