import React from 'react'

import classes from './Modal.module.css'
import close from '../../../assets/images/close.png'

import Backdrop from '../Backdrop/Backdrop'

const modal = props => {
   return(
      props.show ? 
         <React.Fragment>
            <Backdrop closeModal={props.closeModal}/>
            <div className={classes.Modal}>
               <div className={classes.Info}>
                  <h3>Modal Title</h3>
                  <button onClick={props.closeModal}>
                     <img style={{width: '20px'}} src={close} alt="close" />
                  </button>
               </div>
               {props.children}
            </div>
         </React.Fragment>
      : null
   )
}

export default modal