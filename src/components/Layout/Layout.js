import React from 'react'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const layout = props => {
   return (
      <React.Fragment>
         <Navbar />
         <main>{props.children}</main>
         <Footer />
      </React.Fragment>
   )
}

export default layout