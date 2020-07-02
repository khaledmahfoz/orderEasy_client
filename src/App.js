import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'

import Layout from './components/Layout/Layout'
import HomeSearch from './containers/HomeSearch/HomeSearch'
import Resturants from './containers/Resturants/Resturants'
import Resturant from './containers/Resturant/Resturant'
import AuthSignup from './components/AuthSignup/AuthSignup'

function App() {
	return (
		<div className='App'>
			<Layout>
				<Route path='/signup' component={AuthSignup} />
				<Route path='/resturant/:id' component={Resturant} />
				<Route path='/resturants' exact component={Resturants} />
				<Route path='/' exact component={HomeSearch} />
			</Layout>
		</div>
	)
}

export default App
