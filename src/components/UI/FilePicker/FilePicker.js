import React from 'react'

import classes from './FilePicker.module.css'

const filePicker = props => {
   return (
      <button className={classes.FilePickerBtn} onClick={props.filePickerBtnHadler}>
         <svg
            viewBox='0 0 16 16'
            className='bi bi-plus'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path
               fillRule='evenodd'
               d='M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z'
            />
            <path
               fillRule='evenodd'
               d='M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z'
            />
         </svg>
      </button>
   )
}

export default filePicker